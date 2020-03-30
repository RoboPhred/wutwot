import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { MozIotPlugin } from "../types";

import { PluginAdapter } from "./PluginAdapter";

export const PluginAdapterFactory: Identifier<PluginAdapterFactory> = createSymbol(
  "PluginAdapterFactory"
);
export interface PluginAdapterFactory {
  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
