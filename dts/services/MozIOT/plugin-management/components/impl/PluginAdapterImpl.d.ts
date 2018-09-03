import { MozIotPlugin } from "../../contracts";
import { ThingService } from "../../../things";
import { ActionService } from "../../../actions";
import { ActionRequestService } from "../../../action-requests";
import { ThingTypesService } from "../../../thing-types";
export declare class PluginAdapterImpl {
    private _plugin;
    private _thingService;
    private _thingTypesService;
    private _actionService;
    private _actionRequestService;
    constructor(_plugin: MozIotPlugin, _thingService: ThingService, _thingTypesService: ThingTypesService, _actionService: ActionService, _actionRequestService: ActionRequestService);
    private _addThing;
    private _removeThing;
    private _getThings;
    private _getOwnThings;
    private _addCapability;
    private _addActionRequest;
}
