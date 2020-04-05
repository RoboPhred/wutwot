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
  "LocalActionsManager"
);

/**
 * Defines the LocalActionsManager service.
 *
 * This service manages the actions for its parent thing.
 */
export interface LocalActionsManager {
  /**
   * Gets a thing's action by its ID.
   * @param actionId The ID of the action to fetch.
   * @returns The action matching the ID, or `undefined` if no action was found.
   */
  getAction(actionId: string): InternalAction | undefined;

  /**
   * Gets an array of all actions contained by this thing.
   */
  getAllActions(): InternalAction[];

  /**
   * Adds an action to this thing.
   * @param actionDef The definition of the action to add.
   * @param owner The instance of the plugin that owns the action to be created.
   * @returns The created action.
   */
  addAction(actionDef: ThingActionDef, owner: object): InternalAction;
}
