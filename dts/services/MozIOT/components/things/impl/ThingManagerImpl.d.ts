/// <reference types="node" />
import { EventEmitter } from "events";
import { Thing } from "../Thing";
import { ThingFactory } from "../ThingFactory";
import { ThingManager } from "../ThingManager";
import { ThingAggregator } from "../ThingAggregator";
export declare class ThingManagerImpl extends EventEmitter implements ThingManager {
    private _thingFactory;
    private _thingAggregator;
    constructor(_thingFactory: ThingFactory, _thingAggregator: ThingAggregator);
    readonly things: ReadonlyArray<Thing>;
}
