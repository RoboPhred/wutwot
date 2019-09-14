import { ZWaveNode } from "zwave-js";
import { Identifier } from "microinject";

import { MozIotPluginContext } from "../../MozIot";

import createSymbol from "../create-symbol";
import { NodeMonitor } from "./NodeMonitor";

export const NodeMonitorFactory: Identifier<NodeMonitorFactory> = createSymbol(
  "NodeMonitorFactory"
);
export interface NodeMonitorFactory {
  createNodeMonitor(node: ZWaveNode, plugin: MozIotPluginContext): NodeMonitor;
}
