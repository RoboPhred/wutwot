import { injectable, singleton, provides, inject } from "microinject";
import { MozIotPluginContext } from "homectrl-moziot";

import { ZWaveNode } from "../../../ZWave";

import { NodeMonitorFactory } from "../NodeMonitorFactory";
import { NodeMonitor } from "../NodeMonitor";
import { PropertyMonitorFactory } from "../PropertyMonitorFactory";

import { NodeMonitorImpl } from "./NodeMonitorImpl";

@injectable()
@singleton()
@provides(NodeMonitorFactory)
export class NodeMonitorFactoryImpl implements NodeMonitorFactory {
  constructor(
    @inject(PropertyMonitorFactory)
    private _propertyMonitorFactory: PropertyMonitorFactory
  ) {}

  createNodeMonitor(node: ZWaveNode, plugin: MozIotPluginContext): NodeMonitor {
    return new NodeMonitorImpl(node, plugin, this._propertyMonitorFactory);
  }
}
