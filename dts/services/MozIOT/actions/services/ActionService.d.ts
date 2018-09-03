import { Identifier } from "microinject";
import { ThingAction, ThingActionDef } from "../types";
export declare const ActionService: Identifier<ActionService>;
export interface ActionService {
    getAction(thingId: string, actionId: string): ThingAction | undefined;
    addAction(thingId: string, action: ThingActionDef, owner: object): ThingAction;
}
