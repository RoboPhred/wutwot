import { MozIotPlugin } from "./plugin-management";
import { Thing } from "./things";
export declare class MozIot {
    private readonly _container;
    constructor();
    readonly things: ReadonlyArray<Thing>;
    registerPlugin(plugin: MozIotPlugin): void;
}
