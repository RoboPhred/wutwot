import { ThingDef } from "../../../contracts/ThingSource";
import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
import { ActionAggregator } from "../../ActionAggregator/ActionAggregator";
export declare class ThingFactoryImpl implements ThingFactory {
    private _actionAggregator;
    constructor(_actionAggregator: ActionAggregator);
    createThing(def: ThingDef): Thing;
}
