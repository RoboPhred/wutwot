/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingSource } from "../../contracts";
import { Thing } from "../Thing";
import { ThingFactory } from "../ThingFactory";
import { ThingManager } from "../ThingManager";
export declare class ThingManagerImpl extends EventEmitter implements ThingManager {
    private _thingFactory;
    private _thingSources;
    private _things;
    constructor(_thingFactory: ThingFactory, _thingSources: ThingSource[]);
    readonly things: ReadonlyArray<Thing>;
    private _onThingAdded;
    private _onThingRemoved;
    private _createExternalId;
}
