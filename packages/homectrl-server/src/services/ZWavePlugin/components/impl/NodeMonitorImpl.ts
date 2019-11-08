import { ZWaveNode } from "zwave-js";
import {
  ZWaveNodeValueUpdatedArgs,
  ZWaveNodeValueAddedArgs
} from "zwave-js/build/lib/node/Node";
import { ValueID } from "zwave-js/build/lib/node/ValueDB";
import { Subject } from "rxjs";

import { NodeMonitor } from "../NodeMonitor";
import { MozIotPluginContext } from "../../../MozIot";

export class NodeMonitorImpl implements NodeMonitor {
  private _multiLevelSubject: Subject<number> | null = null;
  private _binarySwitchSubject: Subject<boolean> | null = null;

  constructor(private _node: ZWaveNode, private _plugin: MozIotPluginContext) {
    this._node.once("interview completed", this._onNodeInterviewed.bind(this));
  }

  private async _onNodeInterviewed() {
    let name = `${this._node.productType}`;

    if (
      this._node.supportsCC(0x77 /*CommandClasses["Node Naming and Location"]*/)
    ) {
      name = await this._node.commandClasses[
        "Node Naming and Location"
      ].getName();
    }

    const thing = this._plugin.addThing({
      title: name,
      description: `${this._node.productType}`
    });

    if (this._node.supportsCC(0x26 /*CommandClasses["Multilevel Switch"]*/)) {
      this._setupMultiLevelSwitch(thing.id);
    } else if (this._node.supportsCC(0x25)) {
      this._setupBinarySwitch(thing.id);
    }

    this._node.on("value updated", this._onValueUpdated.bind(this));
    this._node.on("value added", (_, args: ZWaveNodeValueAddedArgs) => {
      console.log(
        "value added",
        this._node.id,
        args.commandClassName,
        args.propertyName,
        args.propertyKey,
        args.newValue
      );
    });
  }

  private async _setupBinarySwitch(thingId: string) {
    this._plugin.addCapability(thingId, {
      capabilityType: "type",
      type: "OnOffSwitch"
    });

    const valueId: ValueID = {
      commandClass: 0x25,
      endpoint: 0,
      propertyName: "targetValue"
    };

    this._binarySwitchSubject = new Subject<boolean>();
    const values = await this._node.commandClasses["Binary Switch"].get();
    this._plugin.addCapability(thingId, {
      capabilityType: "property",
      title: "Switch",
      description: /*metadata.description || */ "Switch",
      semanticType: "OnOffProperty",
      type: "boolean",
      initialValue: values.currentValue,
      values: this._binarySwitchSubject,
      onValueChangeRequested: (thingId, propertyId, value) => {
        // this._node.setValue(valueId, value);
        this._node.commandClasses["Binary Switch"].set(value);
      }
    });
  }

  private async _setupMultiLevelSwitch(thingId: string) {
    this._plugin.addCapability(
      thingId,
      {
        capabilityType: "type",
        type: "OnOffSwitch"
      },
      {
        capabilityType: "type",
        type: "MultiLevelSwitch"
      }
    );

    this._multiLevelSubject = new Subject<number>();
    const valueId: ValueID = {
      commandClass: 0x26,
      endpoint: 0,
      propertyName: "targetValue"
    };
    // Some switches are not fetching the value on init.
    // const value = this._node.getValue(valueId);
    // const metadata = this._node.getValueMetadata(valueId);
    const values = await this._node.commandClasses["Multilevel Switch"].get();
    this._plugin.addCapability(thingId, {
      capabilityType: "property",
      title: "Level",
      description: /*metadata.description || */ "Level",
      semanticType: "LevelProperty",
      type: "integer",
      minimum: 0, // TODO: From metadata
      maximum: 255, // TODO: From metadata
      initialValue: values.currentValue,
      values: this._multiLevelSubject,
      onValueChangeRequested: (thingId, propertyId, value) => {
        // this._node.setValue(valueId, value);
        this._node.commandClasses["Multilevel Switch"].set(value);
      }
    });
  }

  private _onValueUpdated(node: ZWaveNode, args: ZWaveNodeValueUpdatedArgs) {
    console.log(
      "value updated",
      this._node.id,
      args.commandClassName,
      args.propertyName,
      args.propertyKey,
      args.newValue
    );

    // These should be "targetValue", but targetValue is not being sent on change.
    // currentValue is wrong, as it will reflect the absolute current value when a change
    //  is requested, meaning when turning off, a dimmer will send a high value as it is transitioning
    //  from on to off.
    if (args.commandClass === 0x26 && args.propertyName === "currentValue") {
      this._multiLevelSubject!.next(args.newValue as number);
    } else if (
      args.commandClass === 0x25 &&
      args.propertyName === "currentValue"
    ) {
      this._binarySwitchSubject!.next(args.newValue as boolean);
    }
  }
}
