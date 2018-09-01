/// <reference types="node" />
import { EventEmitter } from "events";
import { ThingActionRequest } from "../../types";
import { ActionRequestRepository } from "../ActionRequestRepository";
export declare class ActionRequestRepositoryImpl extends EventEmitter implements ActionRequestRepository {
    private _requests;
    get(requestId: string): ThingActionRequest | undefined;
    getForThingAction(thingId: string, actionId: string): ThingActionRequest[];
    addRequest(request: ThingActionRequest): void;
}
