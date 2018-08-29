import { MozIotPlugin } from "../contracts";

import { PluginAdapter } from "./PluginAdapter";
import { Identifier } from "microinject";
import createSymbol from "../../create-symbol";

export const PluginAdapterFactory: Identifier<
  PluginAdapterFactory
> = createSymbol("PluginAdapterFactory");
export interface PluginAdapterFactory {
  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
