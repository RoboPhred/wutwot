import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingActionDef } from "../types";

import { InternalAction } from "./InternalAction";

/**
 * Identifies the LocalActionsManager service
 *
 * This service manages the actions for its parent thing.
 * This service should be scoped to {@link ThingScope}
 */
export const LocalActionsManager: Identifier<LocalActionsManager> = createSymbol(
  "LocalActionsManager",
);

/**
 * Defines the LocalActionsManager service.
 *
 * This service manages the actions for its parent thing.
 */
export interface LocalActionsManager
  extends ReadonlyMap<string, InternalAction> {
  /**
   * Creates a new action and adds it to the thing.
   * @param actionDef The definition of the action to add.
   * @param owner The instance of the plugin that owns the action to be created.
   * @returns The created action.
   */
  createAction(actionDef: ThingActionDef, owner: object): InternalAction;
}
