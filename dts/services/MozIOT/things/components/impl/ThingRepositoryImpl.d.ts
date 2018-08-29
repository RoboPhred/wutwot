/// <reference types="node" />
import { EventEmitter } from "events";
import { Thing } from "../../types";
import { ThingRepository } from "../ThingRepository";
export declare class ThingRepositoryImpl extends EventEmitter implements ThingRepository {
    private _things;
    constructor();
    [Symbol.iterator](): IterableIterator<Thing>;
    get(thingId: string): Thing | undefined;
    addThing(thing: Thing): void;
    removeThing(thingId: string): void;
}
