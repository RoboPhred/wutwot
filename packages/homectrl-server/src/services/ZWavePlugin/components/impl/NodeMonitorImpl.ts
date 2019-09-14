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

  private _setupMultiLevelSwitch(thingId: string) {
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
      commandClass: 38,
      endpoint: 0,
      propertyName: "targetValue"
    };
    const value = this._node.getValue(valueId);
    const metadata = this._node.getValueMetadata(valueId);
    this._plugin.addCapability(thingId, {
      capabilityType: "property",
      title: "Level",
      description: metadata.description || "Level",
      semanticType: "LevelProperty",
      type: "integer",
      minimum: 0, // TODO: From metadata
      maximum: 255, // TODO: From metadata
      initialValue: value,
      values: this._multiLevelSubject,
      onValueChangeRequested: (thingId, propertyId, value) => {
        this._node.setValue(valueId, value);
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

    if (args.commandClass === 38 && args.propertyName === "targetValue") {
      this._multiLevelSubject!.next(args.newValue as number);
    }
  }
}
