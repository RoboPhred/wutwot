import { ReadonlyRecord } from "../../../../types";

/**
 * Describes a thing in the system.
 */
export interface Thing {
  /**
   * The ID of this thing.
   * Auto-generated from name, and changes with it.
   */
  readonly id: string;

  /**
   * The ID of the plugin that created this thing.
   */
  readonly providerPluginId: string;

  /**
   * The name of the thing.
   */
  readonly name: string;

  /**
   * An array of types describing the thing
   */
  readonly types: ReadonlyArray<string>;

  /**
   * The description of the thing.
   */
  readonly description: string;

  /**
   * Additional metadata describing the thing.
   */
  readonly metadata: Record<string, any>;
}

/**
 * Describes the minimum set of unique properties required to create a thing.
 *
 * All other properties present on Thing are derived from other sources,
 * such as capabilities.
 */
export interface ThingDef {
  readonly name: string;
  readonly description: string;
  readonly metadata: ReadonlyRecord<string, any>;
}
