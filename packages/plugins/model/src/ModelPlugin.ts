import { PluginServices, WutWotPlugin } from "@wutwot/core";
import { BindFunction, RegistryModule, ServiceLocator } from "microinject";

import { ModelPluginThingsManager } from "./components/ModelPluginThingsManager";
import { ModelPropertyApplicator } from "./components/ModelPropertyApplicator";

import privateModule from "./module";

export class ModelPlugin implements WutWotPlugin {
  get id(): string {
    return "model";
  }

  onRegisterServices(
    bind: BindFunction,
    { thingsManager }: PluginServices,
  ): RegistryModule {
    bind(ModelPluginThingsManager).toConstantValue(thingsManager);
    return privateModule;
  }

  onPluginPostInitialize(serviceLocator: ServiceLocator) {
    serviceLocator.get(ModelPropertyApplicator).onPostInitialize();
  }
}
