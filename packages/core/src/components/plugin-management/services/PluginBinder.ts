import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

export namespace PluginBinderParameters {
  export const Plugin = "Plugin";
}

export const PluginBinder: Identifier<PluginBinder> =
  createSymbol("PluginBinder");
export interface PluginBinder {
  /**
   * Perform initialization tasks for the bound plugin.
   * This should only be called after all plugins have been bound.
   */
  onPluginInitialize(): void;
}
