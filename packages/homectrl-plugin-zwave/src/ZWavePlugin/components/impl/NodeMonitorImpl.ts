import { MozIotPluginContext, Thing } from "homectrl-moziot";

import { ZWaveNode, getAllValues } from "../../../ZWave";

import { PropertyMonitorFactory } from "../PropertyMonitorFactory";
import { PropertyMonitor } from "../PropertyMonitor";
import { NodeMonitor } from "../NodeMonitor";

export class NodeMonitorImpl implements NodeMonitor {
  private _thing: Thing;
  private _properties: PropertyMonitor[] = [];

  constructor(
    node: ZWaveNode,
    plugin: MozIotPluginContext,
    propertyMonitorFactory: PropertyMonitorFactory
  ) {
    this._thing = plugin.addThing({
      title: node.name || node.product,
      description: node.product
    });

    for (const value of getAllValues(node)) {
      const monitor = propertyMonitorFactory.tryCreateMonitor(
        this._thing,
        value,
        plugin
      );
      if (monitor) {
        this._properties.push(monitor);
      }
    }
  }
}
