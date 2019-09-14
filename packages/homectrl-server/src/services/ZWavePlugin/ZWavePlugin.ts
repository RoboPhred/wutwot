import { injectable, provides, singleton, inject } from "microinject";

import { ZWave, ZWaveNodeAddedEvent, ZWaveNodeRemovedEvent } from "../ZWave";

import { MozIotPlugin, MozIotPluginContext } from "../MozIot";

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
    @inject(NodeMonitorFactory) private _nodeMonitorFactory: NodeMonitorFactory
  ) {
    _zwave
      .on("node.added", this._handleNodeAdded.bind(this))
      .on("node.removed", this._handleNodeRemoved.bind(this));
  }

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    this._plugin = plugin;
    this._zwave.start();
  }

  private _handleNodeAdded({ node }: ZWaveNodeAddedEvent) {
    const monitor = this._nodeMonitorFactory.createNodeMonitor(
      node,
      this._plugin
    );
    this._monitorsByNodeId.set(node.id, monitor);
  }

  private _handleNodeRemoved({ nodeId }: ZWaveNodeRemovedEvent) {
    // TODO: Destroy monitor
  }
}
