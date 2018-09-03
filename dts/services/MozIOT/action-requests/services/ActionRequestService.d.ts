import { Identifier } from "microinject";
import { ThingActionRequestToken } from "../types";
export declare const ActionRequestService: Identifier<ActionRequestService>;
export interface ActionRequestService {
    addRequest(thingId: string, actionId: string, input: any, timeRequested: string): ThingActionRequestToken;
}
