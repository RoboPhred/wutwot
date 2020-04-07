import { JSONSchema6 } from "json-schema";

import { makeReadOnly } from "../../../utils/readonly";
import { DeepImmutableObject, ToJSON } from "../../../types";

import { ThingActionRequest } from "../../action-requests";

/**
 * Represents an Action on a {@link Thing}.
 */
export interface ThingAction {
  /**
   * The ID of this action.
   */
  readonly id: string;

  /**
   * The ID of the {@link Thing} this action is for.
   */
  readonly thingId: string;

  /**
   * The plugin that created this action.
   */
  readonly ownerPlugin: object;

  /**
   * The title of this action.
   */
  readonly title: string;

  /**
   * The semantic type of this action, if any.
   */
  readonly semanticType: string | undefined;

  /**
   * The description of this action.
   */
  readonly description: string;

  /**
   * JSON Schema describing this action's input.
   */
  readonly input: DeepImmutableObject<JSONSchema6>;

  /**
   * A read-only array of requests made to this action.
   */
  readonly requests: ReadonlyArray<ThingActionRequest>;

  /**
   * Requests the execution of this action.
   * @param input The input to the action.  Must match the json-schema specified in {@link #input}.
   * @returns An action request object representing this request.
   */
  request(input: any): ThingActionRequest;

  /**
   * Gets a JSON representation of this action.
   */
  toJSON(): ToJSON<ThingAction>;
}

/**
 * An array of keys making up the public api of a {@link ThingAction}.
 */
export const ThingActionKeys = makeReadOnly<(keyof ThingAction)[]>([
  "id",
  "thingId",
  "ownerPlugin",
  "title",
  "semanticType",
  "description",
  "input",
  "requests",
  "request",
  "toJSON",
]);
