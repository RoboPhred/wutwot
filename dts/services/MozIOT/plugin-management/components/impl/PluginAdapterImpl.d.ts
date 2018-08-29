import { MozIotPlugin } from "../../contracts";
import { ThingRepository } from "../../../things/components/ThingRepository";
import { ThingFactory } from "../../../things/components/ThingFactory";
import { ActionFactory, ActionRepository } from "../../../actions/components";
export declare class PluginAdapterImpl {
    private _plugin;
    private _thingFactory;
    private _thingRepository;
    private _actionFactory;
    private _actionRepository;
    constructor(_plugin: MozIotPlugin, _thingFactory: ThingFactory, _thingRepository: ThingRepository, _actionFactory: ActionFactory, _actionRepository: ActionRepository);
    private _addThing;
    private _removeThing;
    private _getThings;
    private _getOwnThings;
    private _addCapability;
}
