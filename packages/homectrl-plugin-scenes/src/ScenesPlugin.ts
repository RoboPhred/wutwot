import { MozIotPlugin } from "homectrl-moziot";
import { ServiceLocator, RegistryModule } from "microinject";

import privateModule from "./module";

import { SceneManager } from "./services";

export class ScenesPlugin implements MozIotPlugin {
  get id(): string {
    return "scenes";
  }

  onRegisterPrivateServices(): RegistryModule {
    return privateModule;
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    serviceLocator.get(SceneManager);
  }
}
