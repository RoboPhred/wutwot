import { Thing } from "../../things";
import { ThingActionDef } from "../../actions";
import { ThingPropertyDef, ThingProperty } from "../../properties";
import { ThingEventDef, ThingEvent } from "../../thing-events";
import { DataPersistence } from "../../persistence";

import { OwnedPluginThingAction, PluginThingAction } from "./PluginAction";
import { MetadataIdentifier } from "../../metadata";

/**
 * An instance of a WutWot Thing, with additional functionality for use by plugins.
 */
export interface PluginThing extends Thing {
  /**
   * An object containing actions keyed by action ID.
   *
   * The actions contained in this object provide additional
   * functionality for use by plugins.
   */
  readonly actions: ReadonlyMap<string, PluginThingAction>;

  /**
   * Gets a value indicating whether the current plugin owns this Thing.
   *
   * Some operations on a Thing can only be performed by the plugin that created them.
   */
  isOwned(): this is OwnedPluginThing;

  /**
   * Adds a semantic type to a Thing.
   * @param type The semantic type to add.
   */
  addSemanticType(type: string): this;

  /**
   * Adds an action to a Thing.
   * @param def The definition of the action to add.
   */
  addAction(def: ThingActionDef): OwnedPluginThingAction;

  /**
   * Adds a property to a Thing.
   * @param def The definition of the property to add.
   */
  addProperty(def: ThingPropertyDef): ThingProperty;

  /**
   * Adds an event to a Thing.
   * @param def The definition of the event to add.
   */
  addEvent(def: ThingEventDef): ThingEvent;

  /**
   * Gets a persistence object for storing information related to the current plugin on the thing.
   */
  getPluginLocalPersistence(): DataPersistence;

  /**
   * Adds additional metadata to this thing.
   */
  addMetadata<T>(identifier: MetadataIdentifier<T>, value: T): this;

  /**
   * Gets the public API representation of this Thing.
   */
  toThing(): Thing;
}

/**
 * Describes capabilities of a Plugin Thing that are only available to a plugin that owns the Thing.
 */
export interface OwnedPluginThing extends PluginThing {
  /**
   * Deletes the thing from the WOT network.
   */
  delete(): void;
}
