import { injectable, provides } from "microinject";
import { ZWaveNode } from "zwave-js";
import { MozIotPluginContext } from "homectrl-moziot";

import { NodeMonitorFactory } from "../NodeMonitorFactory";
import { NodeMonitorImpl } from "./NodeMonitorImpl";
import { NodeMonitor } from "../NodeMonitor";

@injectable()
@provides(NodeMonitorFactory)
export class NodeMonitorFactoryImpl implements NodeMonitorFactory {
  createNodeMonitor(node: ZWaveNode, plugin: MozIotPluginContext): NodeMonitor {
    return new NodeMonitorImpl(node, plugin);
  }
}
