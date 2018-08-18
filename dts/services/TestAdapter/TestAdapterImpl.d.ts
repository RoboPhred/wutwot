/// <reference types="node" />
import { EventEmitter } from "events";
import { ActionSource, ThingDef, ThingActionDef, ThingActionRequestDef, ThingSource, ThingContext, ThingActionContext } from "../MozIOT";
export declare class TestAdapterImpl extends EventEmitter implements ThingSource, ActionSource {
    readonly id: "test-adapter";
    private readonly _defs;
    private readonly _invocations;
    constructor();
    readonly things: ReadonlyArray<ThingDef>;
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestDef>;
    requestAction(actionContext: ThingActionContext, input: any): ThingActionRequestDef;
    cancelRequest(invocationId: string): boolean;
    addTestThing(def?: Partial<ThingDef>): void;
    removeTestThing(id?: string): void;
}
