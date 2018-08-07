import { Entrypoint } from "../../contracts";
import { TestAdapter } from "../TestAdapter";
export declare class ReplServer implements Entrypoint {
    private _testAdapter;
    private _replServer;
    constructor(_testAdapter: TestAdapter);
    start(): void;
    private _addTestThing;
    private _removeTestThing;
}
