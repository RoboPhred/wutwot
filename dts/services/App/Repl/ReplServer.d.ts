import { Entrypoint } from "../contracts";
import { MozIot } from "../../MozIot";
export declare class ReplServer implements Entrypoint {
    private _mozIot;
    private _replServer;
    constructor(_mozIot: MozIot);
    start(): void;
}
