import { MozIotPlugin } from "homectrl-moziot";
import { ServiceLocator } from "microinject";

export class ScenesPlugin implements MozIotPlugin {
  get id(): string {
    return "scenes";
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {}
}
