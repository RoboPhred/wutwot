import { BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";

import { ThingDirectoryController } from "./components/ThingDirectoryController";
import { HttpPropertyFormProvider } from "./components/HttpPropertyFormProvider";

export interface ExpressBindingPluginOptions {
  pluginId?: string;
}

export class ExpressBindingPlugin implements WutWotPlugin {
  private _id: string = "bindings-express";

  constructor(opts?: ExpressBindingPluginOptions) {
    if (opts && opts.pluginId) {
      this._id = opts.pluginId;
    }
  }

  get id(): string {
    return this._id;
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ThingDirectoryController);
    bind(HttpPropertyFormProvider);
  }
}