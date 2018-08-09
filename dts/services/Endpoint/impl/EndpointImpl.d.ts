import { ThingManager } from "../../MozIOT/components/things/ThingManager";
import { Entrypoint } from "../../../contracts";
export declare class EndpointImpl implements Entrypoint {
    private _thingManager;
    private _app;
    constructor(_thingManager: ThingManager);
    start(): void;
    private _createThingsRouter;
    private _getRestThing;
}
