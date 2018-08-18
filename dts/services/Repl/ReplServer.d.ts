import { Entrypoint } from "../../contracts";
import { TestAdapter } from "../TestAdapter";
import { ThingManager } from "../MozIOT";
export declare class ReplServer implements Entrypoint {
    private _testAdapter;
    private _thingManager;
    private _replServer;
    constructor(_testAdapter: TestAdapter, _thingManager: ThingManager);
    start(): void;
    private _addTestThing;
    private _removeTestThing;
}
