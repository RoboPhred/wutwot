import { Identifier } from "microinject";
import { ThingActionRequest } from "../types";
export declare const ActionRequestRegistry: Identifier<ActionRequestRegistry>;
export interface ActionRequestRegistry {
    get(thingId: string, actionId: string, requestId: string): ThingActionRequest | undefined;
    getForAction(thingId: string, actionId: string): ThingActionRequest[];
    on(event: "request.add", handler: (e: ThingActionRequestAddedEventArgs) => void): this;
    on(event: "request.remove", handler: (e: ThingActionRequestRemovedEventArgs) => void): this;
}
export interface ThingActionRequestAddedEventArgs {
    thingId: string;
    actionId: string;
    requestId: string;
    request: ThingActionRequest;
}
export interface ThingActionRequestRemovedEventArgs {
    thingId: string;
    actionId: string;
    requestId: string;
}
