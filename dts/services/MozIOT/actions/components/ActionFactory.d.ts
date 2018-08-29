import { Identifier } from "microinject";
import { ThingActionDef, ThingAction } from "../types";
export declare const ActionFactory: Identifier<ActionFactory>;
export interface ActionFactory {
    createAction(action: ThingActionDef, thingId: string, owner: object): ThingAction;
}
