import { Identifier } from "microinject";
import { ThingActionRequest, ThingActionRequestToken } from "../types";
export declare const ActionRequestFactory: Identifier<ActionRequestFactory>;
export interface ActionRequestFactory {
    createActionRequest(thingId: string, actionId: string, input: object, timeRequested: string): {
        request: ThingActionRequest;
        token: ThingActionRequestToken;
    };
}
