import { ActionService } from "../ActionService";
import { ThingActionDef, ThingAction } from "../../types";
import { ActionFactory, ActionRepository } from "../../components";
export declare class ActionServiceImpl implements ActionService {
    private _factory;
    private _repository;
    constructor(_factory: ActionFactory, _repository: ActionRepository);
    getAction(thingId: string, actionId: string): ThingAction | undefined;
    getForThing(thingId: string): ThingAction[];
    addAction(thingId: string, def: ThingActionDef, owner: object): ThingAction;
}
