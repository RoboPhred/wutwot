import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionDef } from "../types";
import { InternalAction } from "../services";

/**
 * Identifies the InternalActionFactory service.
 *
 * The InternalActionFactory service is responsible for creating {@link InternalAction}s
 * given action definitions.
 */
export const InternalActionFactory: Identifier<InternalActionFactory> = createSymbol(
  "InternalActionFactory"
);

/**
 * Defines the InternalActionFactory service.
 *
 * The InternalActionFactory service is responsible for creating {@link InternalAction}s
 * given action definitions.
 */
export interface InternalActionFactory {
  /**
   * Creates a new {@link InternalAction} given a {@link ThingActionDef} and the owner plugin.
   * @param def The definition of the action.
   * @param owner The plugin that owns this action.
   */
  createAction(def: ThingActionDef, owner: object): InternalAction;
}
