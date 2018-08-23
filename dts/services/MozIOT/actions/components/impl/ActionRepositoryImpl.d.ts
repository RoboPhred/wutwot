/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingActionContext } from "../../contracts";
import { ActionRepository } from "../ActionRepository";
export declare class ThingRepositoryImpl extends EventEmitter implements ActionRepository {
    private _actions;
    readonly actions: ReadonlyArray<ThingActionContext>;
    get(thingId: string, actionId: string): ThingActionContext | undefined;
    addAction(action: ThingActionContext): void;
    removeAction(thingId: string, actionId: string): void;
}
