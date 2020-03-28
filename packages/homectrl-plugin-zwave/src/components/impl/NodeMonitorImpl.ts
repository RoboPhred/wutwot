import { ZWaveNode } from "zwave-js";
import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import {
  ZWaveNodeValueUpdatedArgs,
  ZWaveNodeValueAddedArgs
} from "zwave-js/build/lib/node/Node";
import { MozIotPluginContext, OwnedPluginThing } from "homectrl-moziot";
import { Subject } from "rxjs";

import { NodeMonitor } from "../NodeMonitor";

export class NodeMonitorImpl implements NodeMonitor {
  private _pluginThing?: OwnedPluginThing;

  private _multiLevelSubject: Subject<number> | null = null;
  private _binarySwitchSubject: Subject<boolean> | null = null;

  constructor(private _node: ZWaveNode, private _plugin: MozIotPluginContext) {
    this._node.once("interview completed", this._onNodeInterviewed.bind(this));
  }

  private async _onNodeInterviewed() {
    let name = `${this._node.productType}`;

    if (this._node.supportsCC(CommandClasses["Node Naming and Location"])) {
      name = await this._node.commandClasses[
        "Node Naming and Location"
      ].getName();
    }

    this._pluginThing = this._plugin.addThing({
      title: name,
      description: `${this._node.productType}`
    });

    if (this._node.supportsCC(CommandClasses["Multilevel Switch"])) {
      this._setupMultiLevelSwitch();
    } else if (this._node.supportsCC(0x25)) {
      this._setupBinarySwitch();
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

  private async _setupBinarySwitch() {
    this._pluginThing!.addType("OnOffSwitch");

    this._binarySwitchSubject = new Subject<boolean>();
    const { currentValue } = await this._node.commandClasses[
      "Binary Switch"
    ].get();

    this._pluginThing!.addProperty({
      title: "Switch",
      description: /*metadata.description || */ "Switch",
      semanticType: "OnOffProperty",
      type: "boolean",
      initialValue: currentValue,
      values: this._binarySwitchSubject,
      onValueChangeRequested: (thingId, propertyId, value) => {
        // this._node.setValue(valueId, value);
        this._node.commandClasses["Binary Switch"].set(value);
      }
    });
  }

  private async _setupMultiLevelSwitch() {
    // TODO: Enable this and provide a Switch property
    // this._pluginThing1.addType("OnOffSwitch");
    this._pluginThing!.addType("MultiLevelSwitch");

    this._multiLevelSubject = new Subject<number>();

    // Some switches are not fetching the value on init.
    // const value = this._node.getValue(valueId);
    // const metadata = this._node.getValueMetadata(valueId);
    const { currentValue } = await this._node.commandClasses[
      "Multilevel Switch"
    ].get();

    this._pluginThing!.addProperty({
      title: "Level",
      description: /*metadata.description || */ "Level",
      semanticType: "LevelProperty",
      type: "integer",
      minimum: 0, // TODO: From metadata
      maximum: 255, // TODO: From metadata
      initialValue: currentValue,
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
