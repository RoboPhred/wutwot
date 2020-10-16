import { BindFunction, RegistryModule, ServiceLocator } from "microinject";
import { ZWaveController } from "zwave-js";
import { WutWotPlugin } from "@wutwot/core";

import { ZWaveProvider, ZWaveEndpointThingMapper } from "./components";

import { ZWavePort } from "./config";
import containerModule from "./module";

export interface ZWavePluginOptions {
  pluginId?: string;
  port?: string;
}
export class ZWavePlugin implements WutWotPlugin {
  private _controller: ZWaveController | null = null;
  private _controllerError: Error | null = null;

  constructor(private _opts: ZWavePluginOptions = {}) {}

  get id(): string {
    if (this._opts.pluginId) {
      return this._opts.pluginId;
    } else if (this._opts.port) {
      return `zwave[port='${this._opts.port}']`;
    } else {
      return "zwave[auto]";
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
    bind(ZWavePort).toConstantValue(this._opts.port);
    return containerModule;
  }

  onPluginInitialize(serviceLocator: ServiceLocator): void {
    serviceLocator
      .get(ZWaveProvider)
      .getController()
      .then((controller) => {
        this._controller = controller;
      })
      .catch((e) => {
        this._controllerError = e;
      });

    // Instantiate the thing manager.
    //  It will automatically start syncing things.
    serviceLocator.get(ZWaveEndpointThingMapper);
  }
}
