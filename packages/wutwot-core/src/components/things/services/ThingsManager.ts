import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef, Thing } from "../types";

import { InternalThing } from "./InternalThing";

export const ThingsManager: Identifier<ThingsManager> = createSymbol(
  "ThingsManager",
);
export interface ThingsManager extends ReadonlyMap<string, InternalThing> {
  /**
   * Creates a new thing and adds it to the thing list.
   * @param def The definition of the thing to create.
   * @param owner The plugin owner of the new thing,
   * @returns The new thing.
   */
  createThing(def: ThingDef, owner: object): InternalThing;

  /**
   * Deletes a thing and removes it from the thing list.
   * @param thingId The ID of the thing to delete.
   */
  deleteThing(thingId: string): void;
}
