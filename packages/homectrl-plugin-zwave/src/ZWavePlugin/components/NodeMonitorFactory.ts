import { Identifier } from "microinject";
import { MozIotPluginContext } from "homectrl-moziot";

import createSymbol from "../../create-symbol";
import { ZWaveNode } from "../../ZWave";

import { NodeMonitor } from "./NodeMonitor";

export const NodeMonitorFactory: Identifier<NodeMonitorFactory> = createSymbol(
  "NodeMonitorFactory"
);
export interface NodeMonitorFactory {
  createNodeMonitor(node: ZWaveNode, plugin: MozIotPluginContext): NodeMonitor;
}
