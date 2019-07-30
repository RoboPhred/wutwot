import { injectable, provides, singleton, inject } from "microinject";
import { MozIotPlugin, MozIotPluginContext, Thing } from "homectrl-moziot";
import { autobind } from "core-decorators";
import { Observable, Observer } from "rxjs";

import {
  ZWave,
  CommandClasses,
  ZWaveValue,
  ZWaveEventSource,
  ZWaveNodeAddedEvent,
  ZWaveNodeRemovedEvent,
  ZWaveValueAddedEvent
} from "../ZWave";
import {
  ZWaveValueChangedEvent,
  ZWaveValueRemovedEvent
} from "../ZWave/services";

@injectable()
@singleton()
@provides(MozIotPlugin)
export class ZWavePlugin implements MozIotPlugin {
  readonly id: string = "Z-Wave";

  private _plugin!: MozIotPluginContext;
  private _thingsByNodeId = new Map<number, Thing>();

  constructor(
    @inject(ZWave) private _zwave: ZWave,
    @inject(ZWaveEventSource) private _zwaveEvents: ZWaveEventSource
  ) {
    _zwaveEvents
      .on("node.added", this._handleNodeAdded)
      .on("node.removed", this._handleNodeRemoved)
      .on("value.added", this._handleValueAdded);
  }

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    this._plugin = plugin;
    this._zwave.start();
  }

  @autobind()
  private _handleNodeAdded({ node }: ZWaveNodeAddedEvent) {
    const thing = this._plugin.addThing({
      title: node.name,
      description: `${node.product} (${node.manufacturer})`
    });
    this._thingsByNodeId.set(node.id, thing);
  }

  @autobind()
  private _handleNodeRemoved({ nodeId }: ZWaveNodeRemovedEvent) {
    const thing = this._thingsByNodeId.get(nodeId);
    if (thing) {
      this._plugin.removeThing(thing.id);
      this._thingsByNodeId.delete(nodeId);
    }
  }

  @autobind()
  private _handleValueAdded({ value }: ZWaveValueAddedEvent) {
    switch (value.class_id) {
      case CommandClasses.SWITCH_BINARY:
        this._addBinarySwitchValue(value);
        break;
    }
  }

  private _addBinarySwitchValue(value: ZWaveValue) {
    const thing = this._thingsByNodeId.get(value.node_id);
    if (!thing) {
      return;
    }

    this._zwave.enablePolling(value);

    this._plugin.addCapability(thing.id, {
      capabilityType: "property",
      title: value.label,
      description: value.help,
      type: "boolean",
      initialValue: Boolean(value.value),
      values: Observable.create((o: Observer<boolean>) => {
        function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
          if (!areValuesSame(value, changedValue)) {
            return;
          }
          o.next(Boolean(changedValue.value));
        }
        function handleRemove({
          nodeId,
          commandClass,
          index
        }: ZWaveValueRemovedEvent) {
          if (
            value.node_id !== nodeId ||
            value.class_id !== commandClass ||
            value.index !== index
          ) {
            return;
          }
          unsub();
        }
        const unsub = () => {
          o.complete();
          this._zwaveEvents.removeListener("value.changed", handleChange);
          this._zwaveEvents.removeListener("value.removed", handleRemove);
        };
        this._zwaveEvents.on("value.changed", handleChange);
        this._zwaveEvents.on("value.removed", handleRemove);
      }),
      onValueChangeRequested(thingId, propertyId, value: boolean) {}
    });
  }
}

function areValuesSame(a: ZWaveValue, b: ZWaveValue): boolean {
  return (
    a.node_id === b.node_id &&
    a.class_id === b.class_id &&
    a.instance === b.instance &&
    a.index === b.index
  );
}
