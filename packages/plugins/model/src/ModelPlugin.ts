import { WutWotPlugin } from "@wutwot/core";
import { ServiceLocator, RegistryModule } from "microinject";

import privateModule from "./module";

export class ModelPlugin implements WutWotPlugin {
  get id(): string {
    return "model";
  }

  onRegisterPrivateServices(): RegistryModule {
    return privateModule;
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {}
}
