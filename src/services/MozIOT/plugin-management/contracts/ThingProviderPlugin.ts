import { Identifier } from "microinject";

import { ReadonlyRecord } from "../../../../types";

import createSymbol from "../../create-symbol";

export const MozIoTPlugin: Identifier<MozIoTPlugin> = createSymbol(
  "MozIoTPlugin"
);
export interface MozIoTPlugin {
  readonly id: string;

  onRegisterPlugin(plugin: MozIotPluginContext): void;
}

export interface MozIotPluginContext {
  addThing(def: NewThingDef): ThingContext;
}

export interface NewThingDef {
  readonly thingTypes?: ReadonlyArray<string>;
  readonly thingDefaultName?: string;
  readonly thingDefaultDescription?: string;
  readonly thingMetadata?: ReadonlyRecord<string, any>;
}

export interface ThingContext {
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
  name: string;

  /**
   * An array of types describing the thing
   */
  readonly types: string[];

  /**
   * The description of the thing.
   */
  description: string;

  /**
   * Additional metadata describing the thing.
   */
  readonly metadata: Record<string, any>;

  // Deletes the thing
  delete(): void;
}
