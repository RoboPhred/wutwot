import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";

import { DeepImmutableObject } from "../../../types";

import { ThingActionRequestStatus } from "../../action-requests";
import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";

export interface ThingActionDef {
  readonly title: string;
  readonly semanticType?: string;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;
  onActionInvocationRequested(
    thingId: string,
    actionId: string,
    input: any
  ): Observable<ThingActionRequestStatus>;
}

export const actionDefSchema: JSONSchema6 = Object.seal({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    semanticType: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    input: { type: "object" }
  },
  required: ["title", "description", "input"]
});

export const validateActionDef = makeValidator(actionDefSchema);
export const validateActionDefOrThrow = makeValidateOrThrow(validateActionDef);
