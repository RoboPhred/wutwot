import { ActionSource, ThingContext, ThingActionRequestDef, ThingActionDef } from "../MozIOT";
export declare class TestAddonActionSource implements ActionSource {
    private _invocationsById;
    private readonly _actionId;
    readonly id: string;
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestDef>;
    requestAction(thingContext: ThingContext, actionId: string): ThingActionRequestDef;
    cancelInvocation(invocationId: string): boolean;
}
