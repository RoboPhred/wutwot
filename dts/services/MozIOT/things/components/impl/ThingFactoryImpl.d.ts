import { ThingDef, Thing } from "../../types";
import { ThingFactory } from "../ThingFactory";
import { ActionRegistry } from "../../../actions/components";
import { IdMapper } from "../../../utils";
export declare class ThingFactoryImpl implements ThingFactory {
    private _actionRegistry;
    private _idMapper;
    constructor(_actionRegistry: ActionRegistry, _idMapper: IdMapper);
    createThing(def: ThingDef, owner: object): Thing;
}
