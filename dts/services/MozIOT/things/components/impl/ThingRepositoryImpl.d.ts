/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingContext } from "../../contracts";
import { ThingRepository } from "../ThingRepository";
export declare class ThingRepositoryImpl extends EventEmitter implements ThingRepository {
    private _things;
    readonly things: ReadonlyArray<ThingContext>;
    get(thingId: string): ThingContext | undefined;
    addThing(thing: ThingContext): void;
    removeThing(thingId: string): void;
}
