import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import {
  ThingActionDef,
  ThingActionRequestDef,
  ThingActionContext,
  ThingActionRequestContext
} from "./types";

export const ActionProviderPlugin: Identifier<
  ActionProviderPlugin
> = createSymbol("ActionProviderPlugin");

/**
 * A source of thing actions.
 *
 * The source is expected to have knowledge of the things it provides
 * actions for.
 *
 * This may be implemented on the same class as the ThingSource,
 * or it may be seperated to provide actions in a mixin style.
 */
export interface ActionProviderPlugin {
  /**
   * The ID of the action source.  Used to disambiguate
   * actions when multiple sources are in play on a single thing.
   */
  readonly id: string;

  onRegisterThingActionSource(plugin: ThingActionSourcePlugin): void;

  /**
   * Request an action execution.
   * @param action The context the action to invoke.
   * @param input The action input.
   */
  onActionRequested(action: ThingActionContext, input: any): void;

  /**
   * Cancels a pending request.
   * @param requestContext The context of the request to cancel.
   */
  onActionRequestCancelRequested(
    requestContext: ThingActionRequestContext
  ): boolean;
}

export interface ThingActionSourcePlugin {
  addAction(def: ThingActionDef): ThingActionContext;
  removeAction(actionId: string): void;

  addActionRequest(def: ThingActionRequestDef): ThingActionRequestContext;
  removeActionRequest(requestId: string): void;
}
