import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { MozIotPlugin } from "../types";

/**
 * Identifies the PluginManager service.
 *
 * The PluginManager service handles the creation and management of plugins.
 */
export const PluginManager: Identifier<PluginManager> = createSymbol(
  "PluginManager"
);

/**
 * Defines the PluginManager service.
 *
 * The PluginManager service handles the creation and management of plugins.
 */
export interface PluginManager {
  /**
   * Add a new plugin to the system.
   *
   * Registered plugins will have their services bound to
   * the service container and will be given the option to start
   * populating WOT objects.
   * @param plugin The plugin to register.
   */
  registerPlugin(plugin: MozIotPlugin): void;
}
