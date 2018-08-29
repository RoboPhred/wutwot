import { ThingActionDef, ThingAction } from "../../types";
import { ActionFactory } from "../ActionFactory";
export declare class ActionFactoryImpl implements ActionFactory {
    createAction(action: ThingActionDef, thingId: string, owner: object): ThingAction;
}
