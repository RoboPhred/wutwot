import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionRequest } from "../types";

import { ActionRequestRegistry } from "./ActionRequestRegistry";

export const ActionRequestRepository: Identifier<
  ActionRequestRepository
> = createSymbol("ActionRequestRepository");
export interface ActionRequestRepository extends ActionRequestRegistry {
  addRequest(request: ThingActionRequest): void;
}
