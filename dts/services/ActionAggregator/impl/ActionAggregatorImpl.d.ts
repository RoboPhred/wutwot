/// <reference types="node" />
import { EventEmitter } from "events";
import { ActionSource, ThingActionDef } from "../../../contracts/ActionSource";
import { ActionAggregator } from "../ActionAggregator";
export declare class ActionAggregatorImpl extends EventEmitter implements ActionAggregator {
    private _actionSources;
    readonly id: string;
    private _actions;
    readonly actions: ReadonlyArray<ThingActionDef>;
    constructor(_actionSources: ActionSource[]);
    private _addAction;
    private _removeAction;
    private _scopeActionId;
}
