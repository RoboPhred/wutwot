import { join as pathJoin, dirname } from "path";
import { ServiceLocator } from "microinject";
import { WutWotPlugin } from "@wutwot/core";
import { ExpressRouter } from "@wutwot/plugin-servient-express";
import Express from "express";

export interface ExpressWebUIPluginOptions {
  pluginId?: string;
}

export class ExpressWebUIPlugin implements WutWotPlugin {
  private _id: string = "webui-express";

  constructor(opts?: ExpressWebUIPluginOptions) {
    if (opts && opts.pluginId) {
      this._id = opts.pluginId;
    }
  }

  get id(): string {
    return this._id;
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    const router = serviceLocator.get(ExpressRouter);
    const uiPath = dirname(require.resolve("@wutwot/explorer/package.json"));
    router.use(Express.static(pathJoin(uiPath, "dist")));
  }
}
