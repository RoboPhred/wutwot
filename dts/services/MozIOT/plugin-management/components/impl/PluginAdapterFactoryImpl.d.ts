import { ThingFactory, ThingRepository } from "../../../things/components";
import { ActionFactory, ActionRepository } from "../../../actions/components";
import { MozIotPlugin } from "../../contracts";
import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";
export declare class PluginAdapterFactoryImpl implements PluginAdapterFactory {
    private _thingFactory;
    private _thingRepository;
    private _actionFactory;
    private _actionRepository;
    constructor(_thingFactory: ThingFactory, _thingRepository: ThingRepository, _actionFactory: ActionFactory, _actionRepository: ActionRepository);
    createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
