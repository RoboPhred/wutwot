import { Identifier } from "microinject";
import { ThingAction } from "../types";
import { ActionRegistry } from "./ActionRegistry";
export declare const ActionRepository: Identifier<ActionRepository>;
export interface ActionRepository extends ActionRegistry {
    addAction(thingId: string, action: ThingAction): void;
    removeAction(thingId: string, actionId: string): void;
}
