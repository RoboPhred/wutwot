import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { MozIotPlugin, PluginAdapter } from "../types";

/**
 * Identifies a PluginAdapterFactory service
 *
 * The PluginAdapterFactory service is responsible for creation {@link PluginAdapter}s from {@link MozIotPlugin}s.
 */
export const PluginAdapterFactory: Identifier<PluginAdapterFactory> = createSymbol(
  "PluginAdapterFactory",
);

/**
 * Defines the PluginAdapterFactory service.
 *
 * The PluginAdapterFactory service is responsible for creation {@link PluginAdapter}s from {@link MozIotPlugin}s.
 */
export interface PluginAdapterFactory {
  /**
   * Create a plugin adapter for the specified plugin.
   * @param plugin The plugin to create an adapter for.
   */
  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
