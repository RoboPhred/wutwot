import { ActionAggregator } from "../../../actions";
import { ThingContext } from "../../contracts";
import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
export declare class ThingFactoryImpl implements ThingFactory {
    private _actionAggregator;
    constructor(_actionAggregator: ActionAggregator);
    createThing(context: ThingContext): Thing;
}
