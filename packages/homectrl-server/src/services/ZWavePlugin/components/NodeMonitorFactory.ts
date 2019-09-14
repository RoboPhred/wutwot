import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { MozIotPluginContext } from "../../MozIot";
import { ZWaveNode } from "../../ZWave";

import { NodeMonitor } from "./NodeMonitor";

export const NodeMonitorFactory: Identifier<NodeMonitorFactory> = createSymbol(
  "NodeMonitorFactory"
);
export interface NodeMonitorFactory {
  createNodeMonitor(node: ZWaveNode, plugin: MozIotPluginContext): NodeMonitor;
}
