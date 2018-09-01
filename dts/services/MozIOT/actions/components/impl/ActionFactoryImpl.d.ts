import { ThingActionDef, ThingAction } from "../../types";
import { ActionRequestFactory } from "../../../action-requests/components/ActionRequestFactory";
import { ActionRequestRepository } from "../../../action-requests/components/ActionRequestRepository";
import { ActionFactory } from "../ActionFactory";
export declare class ActionFactoryImpl implements ActionFactory {
    private _actionRequestFactory;
    private _actionRequestRepository;
    constructor(_actionRequestFactory: ActionRequestFactory, _actionRequestRepository: ActionRequestRepository);
    createAction(action: ThingActionDef, thingId: string, owner: object): ThingAction;
}
