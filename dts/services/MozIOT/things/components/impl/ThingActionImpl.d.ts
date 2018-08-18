import { ActionAggregator, ThingActionContext } from "../../../actions";
import { ThingContext } from "../../contracts";
import { ThingAction, ThingActionRequest } from "../Thing";
export declare class ThingActionImpl implements ThingAction {
    private _thingContext;
    private _actionContext;
    private _actionAggregator;
    constructor(_thingContext: ThingContext, _actionContext: ThingActionContext, _actionAggregator: ActionAggregator);
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly input: any;
    readonly requests: ReadonlyArray<ThingActionRequest>;
    request(input: any): ThingActionRequest;
    private _requestfToInstance;
}
