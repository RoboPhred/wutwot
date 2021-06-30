import { BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";

import { ThingDirectoryController } from "./components/ThingDirectoryController";
import { HttpBindingFormProvider } from "./components/HttpBindingFormProvider";

export class HttpBindingPlugin implements WutWotPlugin {
  get id(): string {
    return "binding-http";
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ThingDirectoryController);
    bind(HttpBindingFormProvider);
  }
}
