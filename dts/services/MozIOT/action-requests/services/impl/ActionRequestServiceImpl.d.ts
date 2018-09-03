import { ThingActionRequestToken } from "../../types";
import { ActionRequestFactory, ActionRequestRepository } from "../../components";
import { ActionRequestService } from "../ActionRequestService";
export declare class ActionRequestServiceImpl implements ActionRequestService {
    private _factory;
    private _repository;
    constructor(_factory: ActionRequestFactory, _repository: ActionRequestRepository);
    addRequest(thingId: string, actionId: string, input: any, timeRequested: string): ThingActionRequestToken;
}
