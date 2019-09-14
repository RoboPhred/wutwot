import { JSONSchema6 } from "json-schema";

import { ReadonlyRecord } from "../../../types";
import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";

/**
 * Describes the minimum set of unique properties required to create a thing.
 *
 * All other properties present on Thing are derived from other sources,
 * such as capabilities.
 */
export interface ThingDef {
  readonly title: string;
  readonly description: string;
  readonly metadata?: ReadonlyRecord<string, any>;
}
export const thingDefSchema: JSONSchema6 = Object.seal({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string" }
  },
  required: ["title"]
});

export const validateThingDef = makeValidator(thingDefSchema);
export const validateThingDefOrThrow = makeValidateOrThrow(validateThingDef);
