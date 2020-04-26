import { BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";

import { ThingDirectoryController } from "./components/ThingDirectoryController";

export interface DirectoryExpressPluginOptions {
  pluginId?: string;
}

export class DirectoryExpressPlugin implements WutWotPlugin {
  private _id: string = "directory-express";

  constructor(opts?: DirectoryExpressPlugin) {
    if (opts && opts._id) {
      this._id = opts._id;
    }
  }

  get id(): string {
    return this._id;
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ThingDirectoryController);
  }
}
