import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";

import { makeReadOnlyDeep } from "../../../utils/readonly";
import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";
import { DeepImmutableObject } from "../../../types";

import { ThingActionRequestStatus } from "../../action-requests";

/**
 * Defines the information required to create a {@link ThingAction}
 */
export interface ThingActionDef {
  /**
   * The title of the action.
   */
  readonly title: string;

  /**
   * The semantic type of the action, if any.
   */
  readonly semanticType?: string;

  /**
   * The description of the action.
   */
  readonly description: string;

  /**
   * JSON Schema describing the inputs the action takes.
   */
  readonly input: DeepImmutableObject<JSONSchema6>;

  /**
   * A callback to handle the invocation of this action.
   * @param thingId The ID of the thing this request is being invoked for.
   * @param actionId The ID of the action this request is being invoked for.
   * @param input The input provided with the request invocation.
   * @returns An rxjs observable describing the state transitions of the request's lifecycle.
   */
  onActionInvocationRequested(
    thingId: string,
    actionId: string,
    input: any
  ): Observable<ThingActionRequestStatus>;
}

/**
 * JSON Schema describing a {@link ThingActionDef}
 */
export const actionDefSchema = makeReadOnlyDeep<JSONSchema6>({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    semanticType: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    input: { type: "object" }
  },
  required: ["title", "description", "input"]
});

/**
 * A validator function for a {@link ThingActionDef} that returns
 * details about the validation.
 */
export const validateActionDef = makeValidator(actionDefSchema);

/**
 * A validator function for a {@link ThingActionDef} that throws an error
 * if the validation fails.
 */
export const validateActionDefOrThrow = makeValidateOrThrow(validateActionDef);
