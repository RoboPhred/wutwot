/**
 * Defines the common structure shared by all affoardances.
 *
 * This is anaglous to the WOT Interaction Affoardance, but is tweaked and extended
 * to fit the needs of wutwot.
 *
 * This does not include binding level properties, such as `forms`,
 * as wutwot does not supply the bindings.  This is a concern left to the implementer.
 *
 * {@see https://w3c.github.io/wot-thing-description/#interactionaffordance}
 */
export interface InteractionAffoardance {
  /**
   * The ID of this action.
   */
  readonly id: string;

  /**
   * The ID of the {@link Thing} this affoardance is for.
   */
  readonly thingId: string;

  /**
   * The plugin that created this affoardance.
   */
  readonly ownerPlugin: object;

  /**
   * The semantic types of this affoardance.
   */
  readonly semanticTypes: readonly string[];

  /**
   * The title of this affoardance.
   */
  readonly title: string | undefined;

  /**
   * The description of this affoardance.
   */
  readonly description: string | undefined;
}
export const InteractionAffoardanceKeys: (keyof InteractionAffoardance)[] = [
  "id",
  "thingId",
  "ownerPlugin",
  "semanticTypes",
  "title",
  "description",
];
