import { injectable, provides, singleton, inject } from "microinject";
import { MozIotPlugin, MozIotPluginContext } from "homectrl-moziot";
import { autobind } from "core-decorators";

import {
  ZWave,
  ZWaveEventSource,
  ZWaveNodeAddedEvent,
  ZWaveNodeRemovedEvent
} from "../ZWave";

import { NodeMonitorFactory } from "./components/NodeMonitorFactory";
import { NodeMonitor } from "./components/NodeMonitor";

@injectable()
@singleton()
@provides(MozIotPlugin)
export class ZWavePlugin implements MozIotPlugin {
  readonly id: string = "Z-Wave";

  private _plugin!: MozIotPluginContext;
  private _monitorsByNodeId = new Map<number, NodeMonitor>();

  constructor(
    @inject(ZWave) private _zwave: ZWave,
    @inject(ZWaveEventSource) zwaveEvents: ZWaveEventSource,
    @inject(NodeMonitorFactory) private _nodeMonitorFactory: NodeMonitorFactory
  ) {
    zwaveEvents
      .on("node.added", this._handleNodeAdded)
      .on("node.removed", this._handleNodeRemoved);
  }

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    this._plugin = plugin;
    this._zwave.start();
  }

  @autobind()
  private _handleNodeAdded({ node }: ZWaveNodeAddedEvent) {
    const monitor = this._nodeMonitorFactory.createNodeMonitor(
      node,
      this._plugin
    );
    this._monitorsByNodeId.set(node.id, monitor);
  }

  @autobind()
  private _handleNodeRemoved({ nodeId }: ZWaveNodeRemovedEvent) {
    // TODO: Destroy monitor
  }
}
