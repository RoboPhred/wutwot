import { Entrypoint } from "../../../contracts";
import { ThingManager } from "../../MozIOT";
export declare class EndpointImpl implements Entrypoint {
    private _thingManager;
    private _app;
    constructor(_thingManager: ThingManager);
    start(): void;
    private _createThingsRouter;
    private _createPropertiesRouter;
    private _createActionsRouter;
    private _createEventsRouter;
    private _getRestThing;
}
