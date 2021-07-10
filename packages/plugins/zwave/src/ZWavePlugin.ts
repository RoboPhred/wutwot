import { BindFunction, RegistryModule, ServiceLocator } from "microinject";
import { ZWaveController } from "zwave-js";
import { PluginServices, WutWotPlugin } from "@wutwot/core";

import {
  ZWavePluginThingManager,
  ZWaveProvider,
  ZWaveThingMapper,
} from "./components";

import { ZWavePort } from "./config";
import containerModule from "./module";

export interface ZWavePluginOptions {
  pluginId?: string;
  device?: string;
}
export class ZWavePlugin implements WutWotPlugin {
  private _controller: ZWaveController | null = null;
  private _controllerError: Error | null = null;

  constructor(private _opts: ZWavePluginOptions = {}) {}

  get id(): string {
    if (this._opts.pluginId) {
      return this._opts.pluginId;
    } else if (this._opts.device) {
      return `zwave[port='${this._opts.device}']`;
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

  onRegisterServices(
    bind: BindFunction,
    { thingManager }: PluginServices,
  ): RegistryModule {
    bind(ZWavePluginThingManager).toConstantValue(thingManager);
    bind(ZWavePort).toConstantValue(this._opts.device);
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
    serviceLocator.get(ZWaveThingMapper);
  }
}
