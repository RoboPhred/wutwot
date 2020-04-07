import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import {
  ThingActionRequestDef,
  ThingActionRequest,
} from "../../action-requests";

import { ThingAction } from "../types";

/**
 * The parameters required by {@link InternalAction}.
 * @internal
 */
export namespace InternalActionParams {
  export const ActionDef = "actionDef";
  export const ActionId = "actionId";
  export const ThingId = "actionOwnerThingId";
  export const Owner = "actionOwner";
}

/**
 * Identifies an InternalAction in the container.
 *
 * This identifier can be used to create InternalActions.
 */
export const InternalAction: Identifier<InternalAction> = createSymbol(
  "InternalAction"
);

/**
 * Defines an InternalAction.
 *
 * InternalActions are the internal representation of {@link ThingAction},
 * and provide mutation capabilities that should not be exposed in the public api.
 */
export interface InternalAction extends ThingAction {
  /**
   * A proxy object providing the public API surface of {@link ThingAction}.
   *
   * This should be used whenever exposing this action outside of MozIot internals.
   */
  readonly publicProxy: ThingAction;

  /**
   * Creates an action request for this action.
   * @param requestDef The definition of the action request to create.
   */
  addRequest(requestDef: ThingActionRequestDef): ThingActionRequest;
}
