import { MozIotPlugin } from "../contracts";
import { PluginAdapter } from "./PluginAdapter";
import { Identifier } from "microinject";
export declare const PluginAdapterFactory: Identifier<PluginAdapterFactory>;
export interface PluginAdapterFactory {
    createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
