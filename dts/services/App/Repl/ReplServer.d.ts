import { Entrypoint } from "../contracts";
import { MozIot } from "../../MozIot";
export declare class ReplServer implements Entrypoint {
    private _mozIoT;
    private _replServer;
    constructor(_mozIoT: MozIot);
    start(): void;
}
