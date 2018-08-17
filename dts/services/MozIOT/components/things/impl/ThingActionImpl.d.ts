import { ThingActionDef, ActionSource } from "../../../contracts/ActionSource";
import { ThingContext } from "../../../contracts";
import { ThingAction, ThingActionRequest } from "../Thing";
export declare class ThingActionImpl implements ThingAction {
    private _def;
    private _thingContext;
    private _source;
    constructor(_def: ThingActionDef, _thingContext: ThingContext, _source: ActionSource);
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly input: any;
    readonly requests: ReadonlyArray<ThingActionRequest>;
    invoke(input: any): ThingActionRequest;
    private _requestDefToRequest;
}
