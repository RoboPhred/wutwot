import { ThingActionRequest, ThingActionRequestToken } from "../../types";
import { ActionRequestFactory } from "../ActionRequestFactory";
export declare class ActionRequestFactoryImpl implements ActionRequestFactory {
    createActionRequest(thingId: string, actionId: string, input: object, timeRequested: string): {
        request: ThingActionRequest;
        token: ThingActionRequestToken;
    };
}
