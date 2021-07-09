import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { WutWotPlugin } from "../types";
import { PluginAdapter } from "../components";

/**
 * Identifies a PluginAdapterFactory service
 *
 * The PluginAdapterFactory service is responsible for creation {@link PluginAdapter}s from {@link WutWotPlugin}s.
 */
export const PluginAdapterFactory: Identifier<PluginAdapterFactory> =
  createSymbol("PluginAdapterFactory");

/**
 * Defines the PluginAdapterFactory service.
 *
 * The PluginAdapterFactory service is responsible for creation {@link PluginAdapter}s from {@link WutWotPlugin}s.
 */
export interface PluginAdapterFactory {
  /**
   * Create a plugin adapter for the specified plugin.
   * @param plugin The plugin to create an adapter for.
   */
  createPluginAdapter(plugin: WutWotPlugin): PluginAdapter;
}
