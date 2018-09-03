import { ThingService } from "../../../things";
import { ActionService } from "../../../actions";
import { ActionRequestFactory, ActionRequestRepository } from "../../../action-requests/components";
import { MozIotPlugin } from "../../contracts";
import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";
export declare class PluginAdapterFactoryImpl implements PluginAdapterFactory {
    private _thingService;
    private _actionService;
    private _actionRequestFactory;
    private _actionRequestRepository;
    constructor(_thingService: ThingService, _actionService: ActionService, _actionRequestFactory: ActionRequestFactory, _actionRequestRepository: ActionRequestRepository);
    createPluginAdapter(plugin: MozIotPlugin): PluginAdapter;
}
