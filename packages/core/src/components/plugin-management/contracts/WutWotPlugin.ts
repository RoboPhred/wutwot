import {
  BindFunction,
  Identifier,
  RegistryModule,
  ServiceLocator,
} from "microinject";

import createSymbol from "../../../create-symbol";

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
   * Register services provided by this plugin.
   *
   * Services using well-known identifiers can be bound here to be provided to other plugins during {@see onPluginInitialize}.
   * Services bound here may not be available in the constructors of plugins.  Plugins expecting to share services should not
   * attempt to locate their services until {@see onPluginInitialize} is called.
   * @param bind The binding function to bind services with.
   * @returns An optional RegistryModule to bind services from.
   */
  onRegisterServices?(bind: BindFunction): RegistryModule | undefined;

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
}
