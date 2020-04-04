import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import {
  ThingActionRequestDef,
  ThingActionRequest,
  ThingActionRequestStatus
} from "../../action-requests";

import { ThingAction } from "../types";

/**
 * @internal
 */
export namespace InternalActionParams {
  export const ActionDef = "actionDef";
  export const ActionId = "actionId";
  export const ThingId = "actionOwnerThingId";
  export const Owner = "actionOwner";
}

export const InternalAction: Identifier<InternalAction> = createSymbol(
  "InternalAction"
);
export interface InternalAction extends ThingAction {
  readonly publicProxy: ThingAction;

  addRequest(requestDef: ThingActionRequestDef): ThingActionRequest;
}
