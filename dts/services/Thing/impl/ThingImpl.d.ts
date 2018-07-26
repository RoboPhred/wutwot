import { ReadonlyRecord } from "../../../types";
import { ThingDef } from "../../../contracts/ThingSource";
import { ActionAggregator } from "../../ActionAggregator/ActionAggregator";
import { Thing, ThingAction } from "../Thing";
export declare class ThingImpl implements Thing {
    private _actionAggregator;
    readonly id: string;
    readonly type: string;
    name: string;
    description: string;
    constructor(def: ThingDef, _actionAggregator: ActionAggregator);
    readonly actions: ReadonlyRecord<string, ThingAction>;
}
