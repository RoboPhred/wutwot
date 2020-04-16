import { ToJSON } from "../../../types";

import { ThingAction } from "../../actions";
import { ThingProperty } from "../../properties";
import { ThingEvent } from "../../thing-events";
import { MetadataProvider } from "../../metadata";

/**
 * Describes a thing in the system.
 */
export interface Thing extends MetadataProvider {
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
  title: string | undefined;

  /**
   * An array of semantic types describing the thing
   */
  readonly semanticTypes: ReadonlyArray<string>;

  /**
   * The description of the thing.
   */
  description: string | undefined;

  /**
   * The actions this thing supports.
   */
  readonly actions: ReadonlyMap<string, ThingAction>;

  /**
   * The properties this thing supports.
   */
  readonly properties: ReadonlyMap<string, ThingProperty>;

  /**
   * The events this thing supports.
   */
  readonly events: ReadonlyMap<string, ThingEvent>;

  toJSON(): ToJSON<Thing>;
}
