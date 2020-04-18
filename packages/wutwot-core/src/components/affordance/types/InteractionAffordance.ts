/**
 * Defines the common structure shared by all affordances.
 *
 * This is anaglous to the WOT Interaction Affordance, but is tweaked and extended
 * to fit the needs of wutwot.
 *
 * This does not include binding level properties, such as `forms`,
 * as wutwot does not supply the bindings.  This is a concern left to the implementer.
 *
 * {@see https://w3c.github.io/wot-thing-description/#interactionaffordance}
 */
export interface InteractionAffordance {
  /**
   * The ID of this action.
   */
  readonly id: string;

  /**
   * The ID of the {@link Thing} this affordance is for.
   */
  readonly thingId: string;

  /**
   * The plugin that created this affordance.
   */
  readonly ownerPlugin: object;

  /**
   * The semantic types of this affordance.
   */
  readonly semanticTypes: readonly string[];

  /**
   * The title of this affordance.
   */
  readonly title: string | undefined;

  /**
   * The description of this affordance.
   */
  readonly description: string | undefined;
}
export const InteractionAffordanceKeys: (keyof InteractionAffordance)[] = [
  "id",
  "thingId",
  "ownerPlugin",
  "semanticTypes",
  "title",
  "description",
];
