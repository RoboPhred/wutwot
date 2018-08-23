import { ReadonlyRecord } from "../../../../types";
import { ThingRegistry } from "../../things";
import { MozIOT } from "../MozIOT";
import { ThingPluginManager } from "../../things/components";
import { Thing } from "../Thing";
export declare class MozIOTImpl implements MozIOT {
    private _thingPluginManager;
    private _thingRegistry;
    constructor(_thingPluginManager: ThingPluginManager, _thingRegistry: ThingRegistry);
    readonly things: ReadonlyRecord<string, Thing>;
}
