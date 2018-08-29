/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingAction } from "../../types";
import { ActionRepository } from "../ActionRepository";
export declare class ActionRepositoryImpl extends EventEmitter implements ActionRepository {
    private _actionsByThingId;
    addAction(thingId: string, action: ThingAction): void;
    removeAction(thingId: string, actionId: string): void;
    get(thingId: string, actionId: string): ThingAction | undefined;
    getForThing(thingId: string): ThingAction[];
}
