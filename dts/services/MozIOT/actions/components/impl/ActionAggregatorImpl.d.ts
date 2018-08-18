import { ThingContext } from "../../../things";
import { ActionSource, ThingActionContext, ThingActionRequestContext } from "../../contracts";
import { ActionAggregator } from "../ActionAggregator";
export declare class ActionAggregatorImpl implements ActionAggregator {
    private _actionSources;
    constructor(actionSources: ActionSource[]);
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionContext>;
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestContext>;
    requestAction(actionContext: ThingActionContext, input: any): ThingActionRequestContext;
    cancelRequest(requestContext: ThingActionRequestContext): boolean;
    private _actionToContext;
    private _requestToContext;
}
