import { BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";

import { ThingDirectoryController } from "./components/ThingDirectoryController";
import { HttpBindingFormProvider } from "./components/HttpBindingFormProvider";

export class ExpressBindingPlugin implements WutWotPlugin {
  get id(): string {
    return "bindings-express";
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ThingDirectoryController);
    bind(HttpBindingFormProvider);
  }
}
