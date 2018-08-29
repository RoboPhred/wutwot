import { MozIotPlugin } from "../../contracts";
import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginManager } from "../PluginManager";
export declare class PluginManagerImpl implements PluginManager {
    private _pluginAdapterFactory;
    private readonly _adapters;
    constructor(_pluginAdapterFactory: PluginAdapterFactory);
    registerPlugin(plugin: MozIotPlugin): void;
}
