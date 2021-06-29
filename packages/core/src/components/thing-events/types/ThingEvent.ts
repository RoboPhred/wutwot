import { TypedDataSchema } from "@wutwot/td";

import { ToJSON } from "../../../types";
import { DeepImmutable } from "../../../immutable";

import { Interaction } from "../../interactions";
import { JSONLDAble } from "../../json-ld";

import { ThingEventRecord } from "./ThingEventRecord";

/**
 * Describes a ThingEvent.
 *
 * Thing events provide the schema for events that can be raised by a {@link Thing}.
 * Thing events also provide the array of records, containing the data for each raised event
 * in chronological order.
 */
export interface ThingEvent extends Interaction, JSONLDAble {
  /**
   * The schema of the data this event contains when raised.
   */
  readonly data: DeepImmutable<TypedDataSchema> | undefined;

  /**
   * An array of records of raised events, in chronological order.
   */
  readonly records: readonly ThingEventRecord[];

  /**
   * Gets a JSON representation of this event.
   */
  toJSON(): ToJSON<ThingEvent>;
}
