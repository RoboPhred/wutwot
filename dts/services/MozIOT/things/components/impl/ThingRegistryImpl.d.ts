/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingContext } from "../../contracts";
import { ThingRegistry } from "../ThingRegistry";
export declare class ThingRegistryImpl extends EventEmitter implements ThingRegistry {
    private _things;
    private _roThings;
    readonly things: ReadonlyMap<string, ThingContext>;
    addThing(thing: ThingContext): void;
    removeThing(thingId: string): void;
}
