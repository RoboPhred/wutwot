import type { IRouter } from "express";
import { ServiceLocator, BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";
import { createControllerRoute } from "simply-express-controllers";

import { ExpressRouter, ExpressRootUrl } from "./services";
import { ExpressController } from "./contracts";

export interface ExpressServientPluginOptions {
  pluginId?: string;
  rootUrl: string;
  router: IRouter;
}

export class ExpressServientPlugin implements WutWotPlugin {
  constructor(private _opts: ExpressServientPluginOptions) {
    if (!_opts.router) {
      throw new Error(
        "router must be specified in ExpressServientPlugin options.",
      );
    }

    if (!_opts.rootUrl) {
      throw new Error(
        "rootUrl must be specified in ExpressServientPlugin options.",
      );
    }
  }

  get id(): string {
    return this._opts.pluginId ?? "express-servient";
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ExpressRouter).toConstantValue(this._opts.rootUrl);
    bind(ExpressRootUrl).toConstantValue(this._opts.rootUrl);
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    if (serviceLocator.has(ExpressController)) {
      const controllers = serviceLocator.getAll(ExpressController);
      const controllerRoute = createControllerRoute(...controllers);
      this._opts.router.use(controllerRoute);
    }
  }
}
