import { ActionSource, ThingActionDef, ThingActionInvocation } from "../../../contracts/ActionSource";
import { ActionAggregator } from "../ActionAggregator";
export declare class ActionAggregatorImpl implements ActionAggregator {
    private _actionSources;
    readonly id: string;
    constructor(_actionSources: ActionSource[]);
    getThingActions(thingId: string): ReadonlyArray<ThingActionDef>;
    getThingInvocations(thingId: string): ReadonlyArray<ThingActionInvocation>;
    invokeAction(thingId: string, actionId: string, input: any): ThingActionInvocation;
    cancelInvocation(invocationId: string): boolean;
}
