import { JSONSchema6 } from "json-schema";

import { makeReadOnlyDeep } from "../../../immutable";
import { ReadonlyRecord } from "../../../types";

import { makeValidator, makeValidateOrThrow } from "../../json-schema";

/**
 * Describes the minimum set of unique properties required to create a thing.
 *
 * All other properties present on Thing are derived from other sources,
 * such as capabilities.
 */
export interface ThingDef {
  /**
   * The ID of this thing unique to the plugin that created it.
   */
  readonly pluginLocalId: string;

  /**
   * The default title to give this thing, if none is provided by the user.
   */
  readonly defaultTitle?: string;

  /**
   * The default description to give this thing, if none is provided by the user.
   */
  readonly defaultDescription?: string;

  /**
   * Additional metadata to make available on this thing.
   */
  readonly metadata?: ReadonlyRecord<string, any>;
}
export const thingDefSchema = makeReadOnlyDeep<JSONSchema6>({
  type: "object",
  properties: {
    pluginLocalId: { type: "string", minLength: 1 },
    defaultTitle: { type: "string", minLength: 1 },
    defaultDescription: { type: "string" },
    metadata: { type: "object", additionalProperties: true },
  },
  required: ["pluginLocalId"],
});

export const validateThingDef = makeValidator(thingDefSchema);
export const validateThingDefOrThrow = makeValidateOrThrow(validateThingDef);
