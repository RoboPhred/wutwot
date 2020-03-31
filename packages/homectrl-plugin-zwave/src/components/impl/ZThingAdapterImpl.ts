import { CommandClasses } from "zwave-js/build/lib/commandclass/CommandClasses";
import { ZWaveNode } from "zwave-js";
import { OwnedPluginThing, PluginThingManager } from "homectrl-moziot";
import { autobind } from "core-decorators";

import { ZThingMonitorFactory } from "../../contracts/ZThingMonitorFactory";
import { METADATA_ZWAVE_NODE } from "../../metadata-keys";
import { ZThingMonitor } from "../../types";
import { isNotNull } from "../../utils";

import { ZThingAdapter } from "../ZThingAdapter";

export class ZThingAdapterImpl implements ZThingAdapter {
  private _destroyed = false;
  private _pluginThing?: OwnedPluginThing;
  private _monitors: ZThingMonitor[] = [];

  constructor(
    private _node: ZWaveNode,
    private _thingManager: PluginThingManager,
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

    let title: string;
    let description: string | undefined;

    if (this._node.supportsCC(CommandClasses["Node Naming and Location"])) {
      title = await this._node.commandClasses[
        "Node Naming and Location"
      ].getName();
      description = await this._node.commandClasses[
        "Node Naming and Location"
      ].getLocation();
    } else if (this._node.deviceConfig) {
      title = this._node.deviceConfig.label;
      description = this._node.deviceConfig.manufacturer;
    } else {
      title = this._node.deviceClass?.specific.name ?? String(this._node.id);
      description = this._node.deviceClass?.generic.name;
    }

    this._pluginThing = this._thingManager.addThing({
      title,
      description,
      metadata: {
        [METADATA_ZWAVE_NODE]: this._node
      }
    });

    this._monitors = this._monitorFactories
      .map(factory => factory.createMonitor(this._node, this._pluginThing!))
      .filter(isNotNull);
  }
}
