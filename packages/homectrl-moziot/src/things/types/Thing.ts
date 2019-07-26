import { ReadonlyRecord } from "../../types";

import { ThingAction } from "../../actions";

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
   * The plugin that created this thing.
   */
  readonly ownerPlugin: object;

  /**
   * The name of the thing.
   */
  readonly title: string;

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

  /**
   * The actions this thing supports.
   */
  readonly actions: ReadonlyRecord<string, ThingAction>;
}
