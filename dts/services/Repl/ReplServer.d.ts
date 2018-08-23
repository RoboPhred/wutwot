import { Entrypoint } from "../../contracts";
import { TestAdapter } from "../TestAdapter";
import { MozIOT } from "../MozIOT";
export declare class ReplServer implements Entrypoint {
    private _mozIoT;
    private _testAdapter;
    private _replServer;
    constructor(_mozIoT: MozIOT, _testAdapter: TestAdapter);
    start(): void;
    private _addTestThing;
    private _removeTestThing;
}
