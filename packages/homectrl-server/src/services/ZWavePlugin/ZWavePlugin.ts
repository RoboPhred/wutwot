import { injectable, provides, singleton, inject } from "microinject";

import { MozIotPlugin, MozIotPluginContext } from "../MozIot";
import { AdapterLocator } from "./components/AdapterLocator";
import { ZWaveDriver } from "./components/ZWaveDriver";
import { NodeMonitorFactory } from "./components/NodeMonitorFactory";

@injectable()
@singleton()
@provides(MozIotPlugin)
export class ZWavePlugin implements MozIotPlugin {
  readonly id: string = "Z-Wave";

  private _plugin!: MozIotPluginContext;

  constructor(
    @inject(AdapterLocator) private _adapterLocator: AdapterLocator,
    @inject(ZWaveDriver) private _driver: ZWaveDriver,
    @inject(NodeMonitorFactory) private _nodeMonitorFactory: NodeMonitorFactory
  ) {}

  onRegisterPlugin(plugin: MozIotPluginContext): void {
    this._plugin = plugin;

    this._start();
  }

  private async _start() {
    const port = await this._adapterLocator.getAdapterPort();
    if (!port) {
      console.log("No z-wave port detected.");
      return;
    }

    await this._driver.connect(port);

    for (const node of this._driver.controller.nodes.values()) {
      this._nodeMonitorFactory.createNodeMonitor(node, this._plugin);
    }
  }
}
