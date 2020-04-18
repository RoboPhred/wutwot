import { JSONSchema6 } from "json-schema";

import { DeepImmutable, makeReadOnly } from "../../../immutable";

/**
 * Defines the properties required when creating an {@link InteractionAffordance}
 */
export interface InteractionAffordanceDef {
  /**
   * The ID of this affordance unique to all affordances
   * of this type on the target thing within the plugin that created it.
   */
  readonly pluginLocalId: string;

  /**
   * The title of this affordance.
   */
  readonly title?: string;

  /**
   * The description of this affordance.
   */
  readonly description?: string;

  /**
   * The semantic type of this affordance.
   * Value can be a single type, or an array of types.
   */
  readonly semanticType?: string | string[];
}

export const interactionAffordanceDefSchema: DeepImmutable<JSONSchema6> = makeReadOnly(
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
