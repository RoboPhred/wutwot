import { ThingFactory, ThingRepository } from "../../../things/components";
import { MozIotPlugin } from "../../contracts";
import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";
export declare class PluginAdapterFactoryImpl implements PluginAdapterFactory {
    private _thingFactory;
    private _thingRepository;
    constructor(_thingFactory: ThingFactory, _thingRepository: ThingRepository);
    createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
