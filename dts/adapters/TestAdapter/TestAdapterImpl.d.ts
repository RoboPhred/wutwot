/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingDef, ThingSource } from "../../contracts/ThingSource";
import { ThingActionDef, ActionSource, ThingActionInvocation } from "../../contracts/ActionSource";
export declare class TestAdapterImpl extends EventEmitter implements ThingSource, ActionSource {
    readonly id: "test-adapter";
    private readonly _defs;
    private readonly _invocations;
    readonly things: ReadonlyArray<ThingDef>;
    readonly invocations: ReadonlyArray<ThingActionInvocation>;
    getActions(thingId: string): ReadonlyArray<ThingActionDef>;
    invokeAction(thingId: string, actionId: string, input: any): ThingActionInvocation;
    cancelAction(): boolean;
    addTestThing(def?: Partial<ThingDef>): void;
    removeTestThing(id?: string): void;
}
