import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import { ZWaveNode } from "zwave-js";
import { OwnedPluginThing, PluginThingsManager } from "homectrl-moziot";
import { autobind } from "core-decorators";

import { ZThingMonitorFactory } from "../contracts/ZThingMonitorFactory";
import { METADATA_ZWAVE_NODE } from "../metadata-keys";
import { ZThingMonitor } from "../types";
import { isNotNull } from "../utils";

import { ZThingAdapter } from "../components/ZThingAdapter";

export class ZThingAdapterImpl implements ZThingAdapter {
  private _destroyed = false;
  private _pluginThing?: OwnedPluginThing;
  private _monitors: ZThingMonitor[] = [];

  constructor(
    private _node: ZWaveNode,
    private _thingsManager: PluginThingsManager,
    private _monitorFactories: ZThingMonitorFactory[]
  ) {
    this._node.once("interview completed", this._onNodeInterviewed);
  }

  destroy(): void {
    this._destroyed = true;
    this._node.removeListener("interview completed", this._onNodeInterviewed);
    this._monitors.forEach(monitor => monitor.destroy());
    this._monitors = [];
  }

  @autobind()
  private async _onNodeInterviewed() {
    if (this._destroyed) {
      return;
    }

    let defaultTitle: string;
    let defaultDescription: string | undefined;

    if (this._node.supportsCC(CommandClasses["Node Naming and Location"])) {
      defaultTitle = await this._node.commandClasses[
        "Node Naming and Location"
      ].getName();
      defaultDescription = await this._node.commandClasses[
        "Node Naming and Location"
      ].getLocation();
    } else if (this._node.deviceConfig) {
      defaultTitle = this._node.deviceConfig.label;
      defaultDescription = this._node.deviceConfig.manufacturer;
    } else {
      defaultTitle =
        this._node.deviceClass?.specific.name ?? String(this._node.id);
      defaultDescription = this._node.deviceClass?.generic.name;
    }

    this._node.on("notification", (node, label, params) => {
      console.log(
        `Node ${node.id} notification ${label} ${JSON.stringify(params)}`
      );
    });
    this._node.on("value updated", (node, e) => {
      console.log(
        `Node ${node.id} value updated ${JSON.stringify(e, null, 2)}`
      );
    });

    this._pluginThing = this._thingsManager.addThing({
      pluginLocalId: `${this._node.id}`,
      defaultTitle,
      defaultDescription,
      metadata: {
        [METADATA_ZWAVE_NODE]: this._node
      }
    });

    this._monitors = this._monitorFactories
      .map(factory => factory.createMonitor(this._node, this._pluginThing!))
      .filter(isNotNull);
  }
}