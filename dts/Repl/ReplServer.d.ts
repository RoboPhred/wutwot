import { TestAdapter } from "../adapters/TestAdapter";
export declare class ReplServer {
    private _testAdapter;
    private _replServer;
    constructor(_testAdapter: TestAdapter);
    start(): void;
    private _addTestThing;
    private _removeTestThing;
}
