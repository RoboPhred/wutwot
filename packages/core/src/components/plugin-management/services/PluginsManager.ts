import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { WutWotPlugin } from "../contracts";

/**
 * Identifies the PluginManager service.
 *
 * The PluginManager service handles the creation and management of plugins.
 */
export const PluginsManager: Identifier<PluginsManager> =
  createSymbol("PluginsManager");

/**
 * Defines the PluginManager service.
 *
 * The PluginManager service handles the creation and management of plugins.
 */
export interface PluginsManager {
  /**
   * Add a new plugin to the system.
   *
   * Registered plugins will have their services bound to
   * the service container and will be given the option to start
   * populating WOT objects.
   * @param plugin The plugin to register.
   */
  registerPlugin(plugin: WutWotPlugin): void;
}
