import { Identifier } from "microinject";
import { ThingActionRequest } from "../types";
import { ActionRequestRegistry } from "./ActionRequestRegistry";
export declare const ActionRequestRepository: Identifier<ActionRequestRepository>;
export interface ActionRequestRepository extends ActionRequestRegistry {
    addRequest(request: ThingActionRequest): void;
}
