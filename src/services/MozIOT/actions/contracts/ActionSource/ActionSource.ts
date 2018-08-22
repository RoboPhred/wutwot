import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingContext } from "../../../things";

import {
  ThingActionDef,
  ThingActionRequestDef,
  ThingActionContext,
  ThingActionRequestContext
} from "./types";

export const ThingActionSource: Identifier<ThingActionSource> = createSymbol(
  "ThingActionSource"
);

/**
 * A source of thing actions.
 *
 * The source is expected to have knowledge of the things it provides
 * actions for.
 *
 * This may be implemented on the same class as the ThingSource,
 * or it may be seperated to provide actions in a mixin style.
 */
export interface ThingActionSource {
  /**
   * The ID of the action source.  Used to disambiguate
   * actions when multiple sources are in play on a single thing.
   */
  readonly id: string;

  onRegisterThingActionSource(plugin: ThingActionSourcePlugin): void;

  /**
   *
   * @param actionContext The context the action to invoke.
   * @param input The action input.
   */
  requestAction(
    actionContext: ThingActionContext,
    input: any
  ): ThingActionRequestDef;

  /**
   * Cancels a pending request.
   * @param requestContext The context of the request to cancel.
   */
  cancelRequest(requestContext: ThingActionRequestContext): boolean;
}

export interface ThingActionSourcePlugin {
  addThingAction(def: ThingActionDef): ThingActionContext;
  addThingActionRequest(def: ThingActionRequestDef): ThingActionRequestContext;
}
