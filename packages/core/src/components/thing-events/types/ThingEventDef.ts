import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";
import { TypedDataSchema } from "@wutwot/td";

import { makeReadOnlyDeep } from "../../../immutable";

import { makeValidator, makeValidateOrThrow } from "../../json-schema";
import { InteractionDef, interactionDefSchema } from "../../interactions";

export interface ThingEventDef extends InteractionDef {
  /**
   * The schema for the data each event record will contain.
   */
  data?: TypedDataSchema;

  /**
   * An observable to deliver events as they occur.
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
  interactionDefSchema,
  eventDefSchema,
);
export const validateEventDefOrThrow = makeValidateOrThrow(validateEventDef);
