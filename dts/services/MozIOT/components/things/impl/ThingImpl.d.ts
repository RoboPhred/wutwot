import { ThingContext } from "../../../contracts/ThingSource";
import { ActionAggregator } from "../../actions/ActionAggregator";
import { Thing, ThingAction } from "../Thing";
export declare class ThingImpl implements Thing {
    private _context;
    private _actionAggregator;
    readonly id: string;
    readonly types: string[];
    name: string;
    description: string;
    constructor(_context: ThingContext, _actionAggregator: ActionAggregator);
    readonly actions: ReadonlyArray<ThingAction>;
}
