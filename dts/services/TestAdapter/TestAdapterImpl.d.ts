/// <reference types="node" />
import { EventEmitter } from "events";
import { ActionSource, ThingDef, ThingActionDef, ThingActionInvocation, ThingSource } from "../MozIOT";
export declare class TestAdapterImpl extends EventEmitter implements ThingSource, ActionSource {
    readonly id: "test-adapter";
    private readonly _defs;
    private readonly _invocations;
    constructor();
    readonly things: ReadonlyArray<ThingDef>;
    getThingActions(thingId: string): ReadonlyArray<ThingActionDef>;
    getThingInvocations(thingId: string): ReadonlyArray<ThingActionInvocation>;
    invokeAction(thingId: string, actionId: string, input: any): ThingActionInvocation;
    cancelInvocation(invocationId: string): boolean;
    addTestThing(def?: Partial<ThingDef>): void;
    removeTestThing(id?: string): void;
}
