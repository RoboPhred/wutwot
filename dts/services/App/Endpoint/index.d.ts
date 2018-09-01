import { MozIot } from "../../MozIot";
import { Entrypoint } from "../contracts";
export declare class Endpoint implements Entrypoint {
    private _mozIoT;
    private _app;
    constructor(_mozIoT: MozIot);
    start(): void;
    private _createThingsRouter;
    private _createPropertiesRouter;
    private _createActionsRouter;
    private _createEventsRouter;
    private _getRestThing;
    private _getRestAction;
    private _getRestActionRequest;
}
