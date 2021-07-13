import { BindFunction, ServiceLocator, RegistryModule } from "microinject";
import { PluginServices } from "./PluginServices";

/**
 * Defines the contract for a plugin to WutWot.
 *
 * Plugins provide services to WutWot and other plugins,
 * and can interact with WutWot provided services to add WOT items
 * into the ecosystem.
 */
export interface WutWotPlugin {
  readonly id: string;

  /**
   * Callback to register services with WutWot.
   *
   * Services bound here will be made available in the shared service locator used through the WutWot API.
   * Services may be accessed by other plugins and the WutWot core if they are bound to a shared identifier.
   *
   * Services can be bound in two ways.
   * - The bind argument provides a fluent API to configure service bindings
   * - The return value of the function may be a microinject ContainerModule containing preconfigured bindings.
   *
   * For more information about creating service bindings,
   * see the [microinject documentation]{@link https://github.com/RoboPhred/node-microinject/tree/master/docs}
   *
   * @param bind The service binder function.
   * @param pluginServices Plugin specific services.
   * @returns A registry module of bindings, if desired.
   */
  onRegisterServices?(
    bind: BindFunction,
    pluginServices: PluginServices,
  ): RegistryModule | undefined | void;

  /**
   * Callback to initialize the plugin.
   *
   * This is called only after all plugins have registered their services.
   * If you rely on another plugin's public services, their services should be available
   * at the time this is called.
   *
   * @param serviceLocator A service locator used to gain access to any services your plugin needs.
   */
  onPluginInitialize?(serviceLocator: ServiceLocator): void;

  /**
   * Callback called when all plugins are initialized.
   *
   * Assuming most plugins will initialize their things during {@see onPluginInitialize},
   * it can be assumed that most things will have been initialized by this point.
   */
  onPluginPostInitialize?(serviceLocator: ServiceLocator): void;
}
