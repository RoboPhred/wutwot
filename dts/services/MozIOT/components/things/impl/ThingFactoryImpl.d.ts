import { ThingDef } from "../../../contracts/ThingSource";
import { ActionAggregator } from "../../actions/ActionAggregator";
import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
export declare class ThingFactoryImpl implements ThingFactory {
    private _actionAggregator;
    constructor(_actionAggregator: ActionAggregator);
    createThing(def: ThingDef): Thing;
}
