import { ActionSource, ThingActionDef, ThingActionRequestDef } from "../../../contracts/ActionSource";
import { ActionAggregator } from "../ActionAggregator";
import { ThingContext } from "../../../contracts";
export declare class ActionAggregatorImpl implements ActionAggregator {
    private _actionSources;
    readonly id: string;
    constructor(_actionSources: ActionSource[]);
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestDef>;
    requestAction(thingContext: ThingContext, actionId: string, input: any): ThingActionRequestDef;
    cancelInvocation(invocationId: string): boolean;
}
