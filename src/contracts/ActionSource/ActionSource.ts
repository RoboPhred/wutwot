import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingActionDef, ThingActionInvocation } from "./types";
import { ThingDef } from "../ThingSource";

export const ActionSource: Identifier<ActionSource> = createSymbol(
  "ActionSource"
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
export interface ActionSource {
  /**
   * The ID of the action source.  Used to disambiguate
   * actions when multiple sources are in play on a single thing.
   */
  readonly id: string;

  /**
   * All action definitions this action source provides.
   * This may change over time as actions are discovered.
   *
   * See events: "action.add", "action.remove"
   */
  readonly actions: ReadonlyArray<ThingActionDef>;

  readonly invocations: ReadonlyArray<ThingActionInvocation>;

  /**
   * Determines what actions are supported on the given thing.
   * @param thingDef The thing definition to fetch actions for.
   */
  getThingActions(thingDef: ThingDef): ReadonlyArray<ThingActionDef>;

  /**
   * Gets an array of invocations pending for the given thing.
   * @param thingDef The thing definition to fetch invocations for.
   */
  getThingInvocations(thingDef: ThingDef): ReadonlyArray<ThingActionInvocation>;

  /**
   *
   * @param thingDef The thing definition of the thing to
   * @param actionId
   * @param input
   */
  invokeAction(
    thingDef: ThingDef,
    actionId: string,
    input: any
  ): ThingActionInvocation;

  /**
   * Cancels a running action.
   * @param thingId The id of the thing on which the action is running.
   * @param actionId The id of the action to cancel.
   */
  cancelAction(thingId: string, actionId: string): boolean;

  /**
   * Raised when an action is added.
   * The action may not be attached to any things at this point.
   */
  on(event: "action.add", handler: (e: ActionEventArgs) => void): void;

  /**
   * Raised when an action is removed.
   * The action should not be attached to any things at this point.
   */
  on(event: "action.remove", handler: (e: ActionEventArgs) => void): void;

  /**
   * Raised when an action is attached to a thing.
   */
  on(event: "action.attach", handler: (e: ActionThingEventArgs) => void): void;

  /**
   * Raised when an action is detatched from a thing.
   */
  on(event: "action.detatch", handler: (e: ActionThingEventArgs) => void): void;

  /**
   * Raised when an action invocation has started.
   */
  on(event: "action.start", handler: (e: ActionStartEventArgs) => void): void;

  /**
   * Raised when an action invocation has ended.
   */
  on(event: "action.end", handler: (e: ActionEndEventArgs) => void): void;
}

export interface ActionEventArgs {
  readonly action: ThingActionDef;
}

export interface ActionThingEventArgs extends ActionEventArgs {
  readonly thingId: string;
}

export interface ActionStartEventArgs extends ActionEventArgs {
  readonly invocation: ThingActionInvocation;
}

export interface ActionEndEventArgs extends ActionEventArgs {
  readonly invocation: ThingActionInvocation;
  readonly canceled: boolean;
}
