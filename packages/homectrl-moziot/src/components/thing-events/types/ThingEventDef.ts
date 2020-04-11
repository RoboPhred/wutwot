import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";

import { makeReadOnlyDeep } from "../../../utils/readonly";

import { makeValidator, makeValidateOrThrow } from "../../json-schema";
import {
  InteractionAffoardanceDef,
  interactionAffoardanceDefSchema,
} from "../../affoardance";
import { DataSchema } from "../../data-schema";

export interface ThingEventDef extends InteractionAffoardanceDef {
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
  interactionAffoardanceDefSchema,
  eventDefSchema,
);
export const validateEventDefOrThrow = makeValidateOrThrow(validateEventDef);
