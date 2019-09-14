import { injectable, provides } from "microinject";

import { NodeMonitorFactory } from "../NodeMonitorFactory";
import { ZWaveNode } from "zwave-js";
import { NodeMonitorImpl } from "./NodeMonitorImpl";
import { MozIotPluginContext } from "../../../MozIot";
import { NodeMonitor } from "../NodeMonitor";

@injectable()
@provides(NodeMonitorFactory)
export class NodeMonitorFactoryImpl implements NodeMonitorFactory {
  createNodeMonitor(node: ZWaveNode, plugin: MozIotPluginContext): NodeMonitor {
    return new NodeMonitorImpl(node, plugin);
  }
}
