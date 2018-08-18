/// <reference types="node" />
import { EventEmitter } from "events";
import { ActionSource, ThingDef, ThingActionDef, ThingActionRequestDef, ThingSource, ThingContext, ThingActionContext, ThingActionRequestContext } from "../MozIOT";
export declare class TestAdapterImpl extends EventEmitter implements ThingSource, ActionSource {
    readonly id: "test-adapter";
    private readonly _defs;
    private readonly _requests;
    constructor();
    readonly things: ReadonlyArray<ThingDef>;
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestDef>;
    requestAction(actionContext: ThingActionContext, input: any): ThingActionRequestDef;
    cancelRequest(requestContext: ThingActionRequestContext): boolean;
    addTestThing(def?: Partial<ThingDef>): void;
    removeTestThing(id?: string): void;
}
