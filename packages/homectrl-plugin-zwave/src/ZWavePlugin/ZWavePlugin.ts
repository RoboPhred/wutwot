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
  ZWaveValueAddedEvent,
  ZWaveValueChangedEvent,
  ZWaveValueRemovedEvent
} from "../ZWave";

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
      title: `${node.name || node.product} [${node.id}]`.trim(),
      description: `${node.product} (${node.manufacturer})`
    });
    for (const class_id of Object.keys(node.classes).map(Number)) {
      for (const index of Object.keys(node.classes[class_id]).map(Number)) {
        for (const instance of Object.keys(node.classes[class_id][index]).map(
          Number
        )) {
          this._handleValueAdded({
            nodeId: node.id,
            commandClass: class_id,
            index,
            instance,
            value: node.classes[class_id][index][instance]
          });
        }
      }
    }
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
    if (value.instance !== 0) {
      return;
    }
    switch (value.class_id) {
      case CommandClasses.SWITCH_MULTILEVEL:
        this._addMultiLevelSwitchValue(value);
        break;
      case CommandClasses.SWITCH_BINARY:
        this._addBinarySwitchValue(value);
        break;
    }
  }

  private _addMultiLevelSwitchValue(zWaveValue: ZWaveValue) {
    const thing = this._thingsByNodeId.get(zWaveValue.node_id);
    if (!thing) {
      return;
    }

    this._plugin.addCapability(thing.id, {
      capabilityType: "type",
      type: "MultiLevelSwitch"
    });

    // this._zwave.enablePolling(value);
    let isRemoved = false;
    const levelValues = Observable.create((o: Observer<number>) => {
      function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
        if (!areValuesSame(zWaveValue, changedValue)) {
          return;
        }
        o.next(Number(changedValue.value));
      }
      function handleRemove({
        nodeId,
        commandClass,
        index
      }: ZWaveValueRemovedEvent) {
        if (
          zWaveValue.node_id !== nodeId ||
          zWaveValue.class_id !== commandClass ||
          zWaveValue.index !== index
        ) {
          return;
        }
        unsub();
      }
      const unsub = () => {
        o.complete();
        this._zwaveEvents.removeListener("value.changed", handleChange);
        this._zwaveEvents.removeListener("value.removed", handleRemove);
        isRemoved = true;
        // TODO: remove property and MultiLevelSwitch type
      };
      this._zwaveEvents.on("value.changed", handleChange);
      this._zwaveEvents.on("value.removed", handleRemove);
    });

    const onOffValues = Observable.create((o: Observer<boolean>) => {
      function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
        if (!areValuesSame(zWaveValue, changedValue)) {
          return;
        }
        o.next(changedValue.value > 0);
      }
      function handleRemove({
        nodeId,
        commandClass,
        index
      }: ZWaveValueRemovedEvent) {
        if (
          zWaveValue.node_id !== nodeId ||
          zWaveValue.class_id !== commandClass ||
          zWaveValue.index !== index
        ) {
          return;
        }
        unsub();
      }
      const unsub = () => {
        o.complete();
        this._zwaveEvents.removeListener("value.changed", handleChange);
        this._zwaveEvents.removeListener("value.removed", handleRemove);
        isRemoved = true;
        // TODO: remove property and MultiLevelSwitch type
      };
      this._zwaveEvents.on("value.changed", handleChange);
      this._zwaveEvents.on("value.removed", handleRemove);
    });

    this._plugin.addCapability(thing.id, {
      capabilityType: "property",
      title: "Level", //value.label || "unnamed",
      description: zWaveValue.label,
      semanticType: "LevelProperty",
      type: "integer",
      minimum: 0,
      maximum: 255,
      initialValue: Number(zWaveValue.value),
      values: levelValues,
      onValueChangeRequested: (
        thingId: string,
        propertyId: string,
        value: number
      ) => {
        if (isRemoved) {
          return;
        }
        this._zwave.setValue(zWaveValue, Number(value));
      }
    });

    this._plugin.addCapability(thing.id, {
      capabilityType: "property",
      title: "Switch", //value.label || "unnamed",
      description: zWaveValue.label,
      semanticType: "OnOffProperty",
      type: "boolean",
      initialValue: zWaveValue.value > 0,
      values: onOffValues,
      onValueChangeRequested: (
        thingId: string,
        propertyId: string,
        value: number
      ) => {
        if (isRemoved) {
          return;
        }
        this._zwave.setValue(zWaveValue, value ? 255 : 0);
      }
    });
  }

  private _addBinarySwitchValue(zWaveValue: ZWaveValue) {
    const thing = this._thingsByNodeId.get(zWaveValue.node_id);
    if (!thing) {
      return;
    }

    this._plugin.addCapability(thing.id, {
      capabilityType: "type",
      type: "OnOffSwitch"
    });

    // this._zwave.enablePolling(value);
    let isRemoved = false;
    const values = Observable.create((o: Observer<boolean>) => {
      function handleChange({ value: changedValue }: ZWaveValueChangedEvent) {
        if (!areValuesSame(zWaveValue, changedValue)) {
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
          zWaveValue.node_id !== nodeId ||
          zWaveValue.class_id !== commandClass ||
          zWaveValue.index !== index
        ) {
          return;
        }
        unsub();
      }
      const unsub = () => {
        o.complete();
        this._zwaveEvents.removeListener("value.changed", handleChange);
        this._zwaveEvents.removeListener("value.removed", handleRemove);
        isRemoved = true;
        // TODO: remove property and OnOffSwitch type
      };
      this._zwaveEvents.on("value.changed", handleChange);
      this._zwaveEvents.on("value.removed", handleRemove);
    });

    this._plugin.addCapability(thing.id, {
      capabilityType: "property",
      title: "Switch", //value.label || "unnamed",
      description: zWaveValue.label,
      semanticType: "OnOffProperty",
      type: "boolean",
      initialValue: Boolean(zWaveValue.value),
      values,
      onValueChangeRequested: (
        thingId: string,
        propertyId: string,
        value: boolean
      ) => {
        if (isRemoved) {
          return;
        }
        this._zwave.setValue(zWaveValue, Boolean(value));
      }
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
