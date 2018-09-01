import { MozIotPlugin } from "../../contracts";
import { ThingRepository, ThingFactory } from "../../../things/components";
import { ActionFactory, ActionRepository } from "../../../actions/components";
import { ActionRequestFactory, ActionRequestRepository } from "../../../action-requests/components";
export declare class PluginAdapterImpl {
    private _plugin;
    private _thingFactory;
    private _thingRepository;
    private _actionFactory;
    private _actionRepository;
    private _actionRequestFactory;
    private _actionRequestRepository;
    constructor(_plugin: MozIotPlugin, _thingFactory: ThingFactory, _thingRepository: ThingRepository, _actionFactory: ActionFactory, _actionRepository: ActionRepository, _actionRequestFactory: ActionRequestFactory, _actionRequestRepository: ActionRequestRepository);
    private _addThing;
    private _removeThing;
    private _getThings;
    private _getOwnThings;
    private _addCapability;
    private _addActionRequest;
}
