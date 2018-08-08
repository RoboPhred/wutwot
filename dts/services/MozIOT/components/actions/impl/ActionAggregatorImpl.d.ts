import { ActionSource, ThingActionDef, ThingActionInvocation } from "../../../contracts/ActionSource";
import { ActionAggregator } from "../ActionAggregator";
import { ThingContext } from "../../../contracts";
export declare class ActionAggregatorImpl implements ActionAggregator {
    private _actionSources;
    readonly id: string;
    constructor(_actionSources: ActionSource[]);
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingInvocations(thingContext: ThingContext): ReadonlyArray<ThingActionInvocation>;
    invokeAction(thingContext: ThingContext, actionId: string, input: any): ThingActionInvocation;
    cancelInvocation(invocationId: string): boolean;
}
