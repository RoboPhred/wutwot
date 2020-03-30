import { BindFunction, ServiceLocator, RegistryModule } from "microinject";

export interface MozIotPlugin {
  readonly id: string;

  onRegisterPublicServices?(bind: BindFunction): RegistryModule | undefined;
  onRegisterPrivateServices?(bind: BindFunction): RegistryModule | undefined;

  onPluginInitialize(serviceLocator: ServiceLocator): void;
}
