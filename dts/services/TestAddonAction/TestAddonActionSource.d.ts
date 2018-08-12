import { ActionSource, ThingContext, ThingActionInvocation, ThingActionDef } from "../MozIOT";
export declare class TestAddonActionSource implements ActionSource {
    private _invocationsById;
    private readonly _actionId;
    readonly id: string;
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingInvocations(thingContext: ThingContext): ReadonlyArray<ThingActionInvocation>;
    invokeAction(thingContext: ThingContext, actionId: string): ThingActionInvocation;
    cancelInvocation(invocationId: string): boolean;
}
