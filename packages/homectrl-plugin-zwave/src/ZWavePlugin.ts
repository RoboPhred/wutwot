import { BindFunction, RegistryModule, ServiceLocator } from "microinject";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";
import { MozIotPlugin } from "homectrl-moziot";

import { ZWaveProvider } from "./components/ZWaveProvider";
import { ZThingManager } from "./components/ZThingManager";

import { ZWavePort } from "./config";
import containerModule from "./module";

export interface ZWavePluginOptions {
  port?: string;
}
export class ZWavePlugin implements MozIotPlugin {
  readonly id: string = "Z-Wave";

  private _port: string | null = null;

  private _controller: ZWaveController | null = null;
  private _controllerError: Error | null = null;

  constructor(opts: ZWavePluginOptions = {}) {
    if (opts.port) {
      this._port = opts.port;
    }
  }

  get controller(): ZWaveController | null {
    if (this._controllerError) {
      throw this._controllerError;
    }

    if (!this._controller) {
      return null;
    }
    return this._controller;
  }

  onRegisterPrivateServices(bind: BindFunction): RegistryModule {
    bind(ZWavePort).toConstantValue(this._port);
    return containerModule;
  }

  onPluginInitialize(serviceLocator: ServiceLocator): void {
    serviceLocator
      .get(ZWaveProvider)
      .getController()
      .then(controller => {
        this._controller = controller;
      })
      .catch(e => {
        this._controllerError = e;
      });

    // Instantiate the thing manager.
    //  It will automatically start syncing things.
    serviceLocator.get(ZThingManager);
  }
}
