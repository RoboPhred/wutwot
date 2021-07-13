import { Form } from "@wutwot/w3c-td";

import { ToJSON, JSONAble } from "../../../types";

import { ThingAction } from "../../actions";
import { ThingProperty } from "../../properties";
import { ThingEvent } from "../../thing-events";
import { MetadataContainer } from "../../metadata";
import { JSONLD, JSONLDAble } from "../../json-ld";
import { DeepImmutableArray } from "../../../immutable";

/**
 * Describes a thing in the system.
 */
export interface Thing extends MetadataContainer, JSONAble, JSONLDAble {
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
  readonly title: string | undefined;

  /**
   * An array of semantic types describing the thing
   */
  readonly semanticTypes: ReadonlyArray<string>;

  /**
   * The description of the thing.
   */
  readonly description: string | undefined;

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

  /**
   * An array of forms describing methods of interacting with this thing.
   */
  readonly forms: DeepImmutableArray<Form>;

  /**
   * Produces a JSON representation of this thing.
   *
   * This is for diagnostic purposes, and does not follow
   * any particular spec.
   *
   * {@see #toJSONLD}
   */
  toJSON(): ToJSON<Thing>;

  /**
   * Produces a json-ld object representing this Thing.
   *
   * This produces a json-ld document in expanded form, and is not
   * by itself compatible with the W3C WOT spec.  It must first be
   * 'compacted' according to the json-ld spec using the W3C WOT
   * context as the primary context.
   */
  toJSONLD(): JSONLD;
}
