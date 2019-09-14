import { singleton, provides, injectable } from "microinject";

import { ZWaveNode, getAllValues } from "../../../ZWave";
import { Thing, MozIotPluginContext } from "../../../MozIot";

import { PropertyMonitorFactory } from "../PropertyMonitorFactory";
import { PropertyMonitor } from "../PropertyMonitor";
import { NodeMonitor } from "../NodeMonitor";
import { NodeMonitorFactory } from "../NodeMonitorFactory";

@injectable()
@singleton()
@provides(NodeMonitorFactory)
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
