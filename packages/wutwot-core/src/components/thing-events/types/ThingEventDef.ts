import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";

import { makeReadOnlyDeep } from "../../../immutable";

import { makeValidator, makeValidateOrThrow } from "../../json-schema";
import {
  InteractionAffordanceDef,
  interactionAffordanceDefSchema,
} from "../../affordance";
import { DataSchema } from "../../data-schema";

export interface ThingEventDef extends InteractionAffordanceDef {
  /**
   * The schema for the data each event record will contain.
   */
  data?: DataSchema;

  /**
   * An observable to source event records from to announce an event invocation.
   */
  eventSource: Observable<any>;
}

export const eventDefSchema = makeReadOnlyDeep<JSONSchema6>({
  type: "object",
  properties: {
    data: {
      type: "object",
      // TODO: reference dataSchemaSchema
    },
  },
});

export const validateEventDef = makeValidator(
  interactionAffordanceDefSchema,
  eventDefSchema,
);
export const validateEventDefOrThrow = makeValidateOrThrow(validateEventDef);
