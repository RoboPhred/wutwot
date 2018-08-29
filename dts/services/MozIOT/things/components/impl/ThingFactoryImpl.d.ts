import { ThingDef, Thing } from "../../types";
import { ThingFactory } from "../ThingFactory";
import { ActionRegistry } from "../../../actions/components";
export declare class ThingFactoryImpl implements ThingFactory {
    private _actionRegistry;
    constructor(_actionRegistry: ActionRegistry);
    createThing(def: ThingDef, owner: object): Thing;
}
