import type { Router } from "express";
import { ServiceLocator, BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";
import { createControllerRoute } from "simply-express-controllers";

import { ExpressRouter } from "./services";
import { ExpressController } from "./contracts";

export interface HttpServientOptions {
  pluginId?: string;
  router: Router;
}

export class HttpServient implements WutWotPlugin {
  private _id: string = "http-servient";
  private _router: Router;

  constructor(opts: HttpServientOptions) {
    if (opts.pluginId) {
      this._id = opts.pluginId;
    }

    this._router = opts.router;
  }

  get id(): string {
    return this._id;
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ExpressRouter).toConstantValue(this._router);
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    const controllers = serviceLocator.getAll(ExpressController);
    const controllerRoute = createControllerRoute(...controllers);
    this._router.use(controllerRoute);
  }
}
