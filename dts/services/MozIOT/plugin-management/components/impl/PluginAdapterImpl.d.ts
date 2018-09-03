import { MozIotPlugin } from "../../contracts";
import { ThingService } from "../../../things";
import { ActionService } from "../../../actions";
import { ActionRequestFactory, ActionRequestRepository } from "../../../action-requests/components";
export declare class PluginAdapterImpl {
    private _plugin;
    private _thingService;
    private _actionService;
    private _actionRequestFactory;
    private _actionRequestRepository;
    constructor(_plugin: MozIotPlugin, _thingService: ThingService, _actionService: ActionService, _actionRequestFactory: ActionRequestFactory, _actionRequestRepository: ActionRequestRepository);
    private _addThing;
    private _removeThing;
    private _getThings;
    private _getOwnThings;
    private _addCapability;
    private _addActionRequest;
}
