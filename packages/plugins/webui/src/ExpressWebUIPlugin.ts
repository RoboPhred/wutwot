import { join as pathJoin, dirname } from "path";
import { ServiceLocator } from "microinject";
import { WutWotPlugin } from "@wutwot/core";
import { HttpRouter } from "@wutwot/plugin-servient-http";
import Express from "express";

export class ExpressWebUIPlugin implements WutWotPlugin {
  get id(): string {
    return "webui";
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    const router = serviceLocator.get(HttpRouter);
    const uiPath = dirname(require.resolve("@wutwot/explorer/package.json"));
    router.use(Express.static(pathJoin(uiPath, "dist")));
  }
}
