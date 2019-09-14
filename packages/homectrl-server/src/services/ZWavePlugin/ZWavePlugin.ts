import { injectable, provides, singleton, inject } from "microinject";

import { MozIotPlugin, MozIotPluginContext } from "../MozIot";
import { AdapterLocator } from "./components/AdapterLocator";
import { ZWaveDriver } from "./components/ZWaveDriver";

@injectable()
@singleton()
@provides(MozIotPlugin)
export class ZWavePlugin implements MozIotPlugin {
  readonly id: string = "Z-Wave";

  private _plugin!: MozIotPluginContext;

  constructor(
    @inject(AdapterLocator) private _adapterLocator: AdapterLocator,
    @inject(ZWaveDriver) private _driver: ZWaveDriver
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
      console.log("Found node", node.id);
      this._plugin.addThing({
        title: String(node.id),
        description: "A Node"
      });
    }
  }
}
