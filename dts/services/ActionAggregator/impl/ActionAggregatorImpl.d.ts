/// <reference types="node" />
import { EventEmitter } from "events";
import { ActionSource, ThingActionDef } from "../../../contracts/ActionSource";
import { ActionAggregator } from "../ActionAggregator";
export declare class ActionAggregatorImpl extends EventEmitter implements ActionAggregator {
    private _actionSources;
    constructor(_actionSources: ActionSource[]);
    getActions(thingId: string): ReadonlyArray<ThingActionDef>;
}
