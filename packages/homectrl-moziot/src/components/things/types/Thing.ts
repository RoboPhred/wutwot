import { ReadonlyRecord, ToJSON } from "../../../types";
import { makeReadOnly } from "../../../utils/readonly";

import { ThingAction } from "../../actions";
import { ThingProperty } from "../../properties";
import { ThingEvent } from "../../thing-events";

/**
 * Describes a thing in the system.
 */
export interface Thing {
  /**
   * The ID of this thing.
   */
  readonly id: string;

  /**
   * The plugin that created this thing.
   */
  readonly ownerPlugin: object;

  /**
   * The name of the thing.
   */
  title: string;

  /**
   * An array of semantic types describing the thing
   */
  readonly semanticTypes: ReadonlyArray<string>;

  /**
   * The description of the thing.
   */
  description: string;

  /**
   * Additional metadata describing the thing.
   */
  readonly metadata: Record<string, any>;

  /**
   * The actions this thing supports.
   */
  readonly actions: ReadonlyRecord<string, ThingAction>;

  /**
   * The properties this thing supports.
   */
  readonly properties: ReadonlyRecord<string, ThingProperty>;

  /**
   * The events this thing supports.
   */
  readonly events: ReadonlyRecord<string, ThingEvent>;

  toJSON(): ToJSON<Thing>;
}
export const ThingKeys = makeReadOnly<(keyof Thing)[]>([
  "id",
  "ownerPlugin",
  "title",
  "semanticTypes",
  "description",
  "metadata",
  "actions",
  "properties",
  "events",
  "toJSON"
]);
