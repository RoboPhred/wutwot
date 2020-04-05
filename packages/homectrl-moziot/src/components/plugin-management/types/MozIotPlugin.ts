import { BindFunction, ServiceLocator, RegistryModule } from "microinject";

/**
 * Defines the contract for a plugin to MozIot.
 *
 * Plugins provide services to MozIot and other plugins,
 * and can interact with MozIot provided services to add WOT items
 * into the ecosystem.
 */
export interface MozIotPlugin {
  readonly id: string;

  /**
   * Callback to register public services with MozIot.
   *
   * Services bound here will be available both to MozIot and
   * to other plugins.
   *
   * Use this to expose services you want to share, or to
   * provide supported services to MozIot.
   *
   * Services can be bound in two ways.
   * - The bind argument provides a fluent API to configure service bindings
   * - The return value of the function may be a microinject ContainerModule containing preconfigured bindings.
   *
   * For more information about creating service bindings,
   * see the [microinject documentation]{@link https://github.com/RoboPhred/node-microinject/tree/master/docs}
   *
   * @param bind The service binder function.
   * @returns A registry module of bindings, if desired.
   */
  onRegisterPublicServices?(bind: BindFunction): RegistryModule | undefined;

  /**
   * Callback to register private services within your plugin.
   *
   * Services bound here will only be available to your plugin.
   *
   * Use this to configure injected services for your plugin.
   *
   * Services can be bound in two ways.
   * - The bind argument provides a fluent API to configure service bindings
   * - The return value of the function may be a microinject ContainerModule containing preconfigured bindings.
   *
   * For more information about creating service bindings,
   * see the [microinject documentation]{@link https://github.com/RoboPhred/node-microinject/tree/master/docs}
   *
   * @param bind The service binder function.
   * @returns A registry module of bindings, if desired.
   */
  onRegisterPrivateServices?(bind: BindFunction): RegistryModule | undefined;

  /**
   * Callback to initialize the plugin.
   *
   * This is called only after all plugins have registered their services.
   * If you rely on another plugin's public services, their services should be available
   * at the time this is called.
   *
   * @param serviceLocator A service locator used to gain access to any services your plugin needs.
   */
  onPluginInitialize(serviceLocator: ServiceLocator): void;
}
