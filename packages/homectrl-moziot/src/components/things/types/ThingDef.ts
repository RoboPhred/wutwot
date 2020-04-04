import { JSONSchema6 } from "json-schema";

import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";
import { makeReadOnlyDeep } from "../../../utils/readonly";
import { ReadonlyRecord } from "../../../types";

/**
 * Describes the minimum set of unique properties required to create a thing.
 *
 * All other properties present on Thing are derived from other sources,
 * such as capabilities.
 */
export interface ThingDef {
  readonly title: string;
  readonly description?: string;
  readonly metadata?: ReadonlyRecord<string, any>;
}
export const thingDefSchema = makeReadOnlyDeep<JSONSchema6>({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string" },
    metadata: { type: "object", additionalProperties: true }
  },
  required: ["title"]
});

export const validateThingDef = makeValidator(thingDefSchema);
export const validateThingDefOrThrow = makeValidateOrThrow(validateThingDef);
