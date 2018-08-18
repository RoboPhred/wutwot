import { ActionSource, ThingContext, ThingActionRequestDef, ThingActionDef, ThingActionContext, ThingActionRequestContext } from "../MozIOT";
export declare class TestAddonActionSource implements ActionSource {
    private _requestsById;
    private readonly _actionId;
    readonly id: string;
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestDef>;
    requestAction(actionContext: ThingActionContext, input: any): ThingActionRequestDef;
    cancelRequest(requestContext: ThingActionRequestContext): boolean;
}
