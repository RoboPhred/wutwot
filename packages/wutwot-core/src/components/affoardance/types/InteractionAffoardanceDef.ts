import { JSONSchema6 } from "json-schema";

import { DeepImmutable, makeReadOnly } from "../../../immutable";

/**
 * Defines the properties required when creating an {@link InteractionAffoardance}
 */
export interface InteractionAffoardanceDef {
  /**
   * The ID of this affoardance unique to all affoardances
   * of this type on the target thing within the plugin that created it.
   */
  readonly pluginLocalId: string;

  /**
   * The title of this affoardance.
   */
  readonly title?: string;

  /**
   * The description of this affoardance.
   */
  readonly description?: string;

  /**
   * The semantic type of this affoardance.
   * Value can be a single type, or an array of types.
   */
  readonly semanticType?: string | string[];
}

export const interactionAffoardanceDefSchema: DeepImmutable<JSONSchema6> = makeReadOnly(
  {
    type: "object",
    properties: {
      pluginLocalId: { type: "string", minLength: 1 },
      title: { type: "string", minLength: 1 },
      description: { type: "string", minLength: 1 },
      semanticType: { type: ["string", "array"], items: { type: "string" } },
    },
    required: ["pluginLocalId"],
  },
);
