import { ThingService } from "../../../things";
import { ActionService } from "../../../actions";
import { ActionRequestService } from "../../../action-requests";
import { MozIotPlugin } from "../../contracts";
import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";
export declare class PluginAdapterFactoryImpl implements PluginAdapterFactory {
    private _thingService;
    private _actionService;
    private _requestService;
    constructor(_thingService: ThingService, _actionService: ActionService, _requestService: ActionRequestService);
    createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
