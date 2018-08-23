import { Identifier } from "microinject";
import { ThingActionContext } from "../contracts";
export declare const ActionRepository: Identifier<ActionRepository>;
export interface ActionRepository {
    addAction(action: ThingActionContext): void;
    removeAction(thingId: string, actionId: string): void;
}
