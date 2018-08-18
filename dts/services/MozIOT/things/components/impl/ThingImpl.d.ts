import { ReadonlyRecord } from "../../../../../types";
import { ActionAggregator } from "../../../actions";
import { ThingContext } from "../../contracts";
import { Thing, ThingAction } from "../Thing";
export declare class ThingImpl implements Thing {
    private _thingContext;
    private _actionAggregator;
    readonly id: string;
    readonly types: string[];
    name: string;
    description: string;
    constructor(_thingContext: ThingContext, _actionAggregator: ActionAggregator);
    readonly actions: ReadonlyRecord<string, ThingAction>;
}
