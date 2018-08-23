import { Entrypoint } from "../../../contracts";
import { MozIOT } from "../../MozIOT";
export declare class EndpointImpl implements Entrypoint {
    private _mozIoT;
    private _app;
    constructor(_mozIoT: MozIOT);
    start(): void;
    private _createThingsRouter;
    private _createPropertiesRouter;
    private _createActionsRouter;
    private _createEventsRouter;
    private _getRestThing;
}
