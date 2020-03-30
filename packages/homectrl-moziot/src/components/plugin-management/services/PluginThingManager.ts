import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef } from "../../things";

import { OwnedPluginThing, PluginThing } from "../types/PluginThing";

export const PluginThingManager: Identifier<PluginThingManager> = createSymbol(
  "PluginThingManager"
);
export interface PluginThingManager {
  /**
   * Adds a new thing owned by this plugin.
   *
   * @param def The definition of the thing to add.
   * @returns A PluginThing object that can be used to further define the Thing.
   */
  addThing(def: ThingDef): OwnedPluginThing;

  /**
   * Gets a PluginThing object capable of mutating the given thing.
   * @param id The ID of the thing to get.
   */
  getThing(id: string): PluginThing | null;

  /**
   * Gets an array of all things known to the system.
   */
  getThings(): PluginThing[];

  /**
   * Gets an array of all things owned by this plugin.
   */
  getOwnThings(): OwnedPluginThing[];
}
