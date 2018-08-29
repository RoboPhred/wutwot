import { MozIotPlugin } from "../contracts";
import { Identifier } from "microinject";
export declare const PluginManager: Identifier<PluginManager>;
export interface PluginManager {
    registerPlugin(plugin: MozIotPlugin): void;
}
