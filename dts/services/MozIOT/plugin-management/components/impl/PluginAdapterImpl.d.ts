import { MozIotPlugin } from "../../contracts";
import { ThingRepository } from "../../../things/components/ThingRepository";
import { ThingFactory } from "../../../things/components/ThingFactory";
export declare class PluginAdapterImpl {
    private _thingFactory;
    private _thingRepository;
    private readonly _pluginId;
    constructor(plugin: MozIotPlugin, _thingFactory: ThingFactory, _thingRepository: ThingRepository);
    private _addThing;
    private _removeThing;
    private _getThings;
    private _getOwnThings;
}
