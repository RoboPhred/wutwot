import { ThingAggregator } from "../ThingAggregator";
import { ThingSource, ThingDef } from "../../../contracts";
export declare class ThingAggregatorImpl implements ThingAggregator {
    private _thingSources;
    readonly id: string;
    constructor(_thingSources: ThingSource[]);
    readonly things: ReadonlyArray<ThingDef>;
}
