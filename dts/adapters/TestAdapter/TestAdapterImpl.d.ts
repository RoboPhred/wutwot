/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingDef, ThingSource } from "../../contracts/ThingSource";
import { ThingActionDef, ActionSource, ThingActionInvocation } from "../../contracts/ActionSource";
export declare class TestAdapterImpl extends EventEmitter implements ThingSource, ActionSource {
    readonly id: "test-adapter";
    private readonly _defs;
    private readonly _invocations;
    readonly things: ReadonlyArray<ThingDef>;
    getThingActions(thingId: string): ReadonlyArray<ThingActionDef>;
    getThingInvocations(thingId: string): ReadonlyArray<ThingActionInvocation>;
    invokeAction(thingId: string, actionId: string, input: any): ThingActionInvocation;
    cancelInvocation(invocationId: string): boolean;
    addTestThing(def?: Partial<ThingDef>): void;
    removeTestThing(id?: string): void;
}
