import { Identifier } from "microinject";

import { MaybeArray } from "../../../../types";

import createSymbol from "../../create-symbol";
import { Thing, ThingDef } from "../../things";
import { ThingActionDef } from "../../actions";

export const MozIotPlugin: Identifier<MozIotPlugin> = createSymbol(
  "MozIotPlugin"
);
export interface MozIotPlugin {
  readonly id: string;

  onRegisterPlugin(plugin: MozIotPluginContext): void;
}

export interface MozIotPluginContext {
  /**
   * Adds a new thing owned by this plugin.
   *
   * @param def The definition of the thing to add.
   * @param capabilities Capabilities to apply to the thing.
   */
  addThing(
    def: ThingDef,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): Thing;

  /**
   * Removes a thing from the system.
   * The thing specified must be one owned by the plugin.
   * @param thingId The id of the thing to remove.
   */
  removeThing(thingId: string): void;

  /**
   * Gets an array of all things known to the system.
   */
  getThings(): Thing[];

  /**
   * Gets an array of all things owned by this plugin.
   */
  getOwnThings(): Thing[];

  /**
   * Adds one or more capabilities to a thing.
   * This can be used to attach capabilities to things not owned by
   * this plugin.
   *
   * @param thingId The thing id to add a capability to.
   * @param capabilities the capabilities to add.
   */
  addCapability(
    thingId: string,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): void;
}

export type ThingCapabilityDef =
  | ThingTypeCapabilityDef
  | ThingActionCapabilityDef;

export interface ThingTypeCapabilityDef extends ThingTypeDef {
  capabilityType: "type";
}

export interface ThingTypeDef {
  type: string;
}

export interface ThingActionCapabilityDef extends ThingActionDef {
  capabilityType: "action";
}
