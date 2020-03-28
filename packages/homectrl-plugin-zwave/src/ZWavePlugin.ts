import { Container } from "microinject";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";

import { MozIotPlugin, MozIotPluginContext } from "homectrl-moziot";

import { AdapterLocator } from "./components/AdapterLocator";
import { ZWaveDriver } from "./components/ZWaveDriver";
import { NodeMonitorFactory } from "./components/NodeMonitorFactory";

import containerModule from "./module";
import { ZWavePort } from "./config";

export interface ZWavePluginOptions {
  port?: string;
}
export class ZWavePlugin implements MozIotPlugin {
  readonly id: string = "Z-Wave";

  private _container: Container = new Container();
  private _adapterLocator: AdapterLocator;
  private _driver: ZWaveDriver;
  private _nodeMonitorFactory: NodeMonitorFactory;

  private _plugin!: MozIotPluginContext;

  constructor(opts: ZWavePluginOptions = {}) {
    this._container.load(containerModule);

    try {
      (this._container as any)._finalizeBinders();
    } catch (e) {
      debugger;
      console.error(e);
    }

    if (opts.port) {
      this._container.bind(ZWavePort).toConstantValue(opts.port);
    }

    this._adapterLocator = this._container.get(AdapterLocator);
    this._driver = this._container.get(ZWaveDriver);
    this._nodeMonitorFactory = this._container.get(NodeMonitorFactory);
  }

  get controller(): ZWaveController {
    return this._driver.controller;
  }

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
