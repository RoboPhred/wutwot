import { ThingActionDef, ActionSource } from "../../../contracts/ActionSource";
import { ThingAction, ThingActionRequest } from "../Thing";
export declare class ThingActionImpl implements ThingAction {
    private _def;
    private _source;
    constructor(_def: ThingActionDef, _source: ActionSource);
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly requests: ReadonlyArray<ThingActionRequest>;
    invoke(input: any): ThingActionRequest;
    private _invocationToRequest;
}
