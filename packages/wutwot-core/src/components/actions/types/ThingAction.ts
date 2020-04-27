import { TypedDataSchema } from "@wutwot/td";

import { DeepImmutableObject, makeReadOnly } from "../../../immutable";
import { ToJSON, JSONAble } from "../../../types";

import { ThingActionRequest } from "../../action-requests";
import {
  InteractionAffordance,
  InteractionAffordanceKeys,
} from "../../affordance";
import { JSONLDAble } from "../../json-ld";

/**
 * Represents an Action on a {@link Thing}.
 */
export interface ThingAction
  extends InteractionAffordance,
    JSONLDAble,
    JSONAble<ToJSON<ThingAction>> {
  /**
   * JSON Schema describing this action's input.
   */
  readonly input: DeepImmutableObject<TypedDataSchema> | undefined;

  /**
   * JSON Schema describing this action's output.
   */
  readonly output: DeepImmutableObject<TypedDataSchema> | undefined;

  /**
   * A read-only array of requests made to this action.
   */
  readonly requests: ReadonlyArray<ThingActionRequest>;

  /**
   * Requests the execution of this action.
   * @param input The input to the action.  Must match the json-schema specified in {@link #input}.
   * @returns An action request object representing this request.
   */
  invoke(input: any): ThingActionRequest;

  /**
   * Gets a JSON representation of this action.
   */
  toJSON(): ToJSON<ThingAction>;
}

/**
 * An array of keys making up the public api of a {@link ThingAction}.
 */
export const ThingActionKeys = makeReadOnly<(keyof ThingAction)[]>([
  ...InteractionAffordanceKeys,
  "input",
  "output",
  "requests",
  "invoke",
  "toJSON",
]);
