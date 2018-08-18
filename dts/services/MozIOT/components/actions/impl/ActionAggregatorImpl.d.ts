import { ActionSource, ThingActionContext, ThingActionRequestContext } from "../../../contracts/ActionSource";
import { ActionAggregator } from "../ActionAggregator";
import { ThingContext } from "../../../contracts";
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
