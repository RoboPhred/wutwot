import { injectable, provides, inject } from "microinject";
import { ZWaveNode } from "zwave-js";
import { PluginThingManager } from "homectrl-moziot";

import { NodeMonitorFactory } from "../NodeMonitorFactory";
import { NodeMonitorImpl } from "./NodeMonitorImpl";
import { NodeMonitor } from "../NodeMonitor";

@injectable()
@provides(NodeMonitorFactory)
export class NodeMonitorFactoryImpl implements NodeMonitorFactory {
  constructor(
    @inject(PluginThingManager) private _pluginThingManager: PluginThingManager
  ) {}

  createNodeMonitor(node: ZWaveNode): NodeMonitor {
    return new NodeMonitorImpl(node, this._pluginThingManager);
  }
}
