import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { MozIotPlugin, PluginAdapter } from "../types";

export const PluginAdapterFactory: Identifier<PluginAdapterFactory> = createSymbol(
  "PluginAdapterFactory"
);
export interface PluginAdapterFactory {
  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
