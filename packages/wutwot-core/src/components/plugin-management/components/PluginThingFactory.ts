import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { InternalThing } from "../../things";

import { PluginThing, OwnedPluginThing, PluginAdapter } from "../types";

/**
 * Identifies the PluginThingFactory service.
 *
 * The PluginThingFactory service is responsible for creating {@link PluginThing}s and {@link OwnedPluginThing}s
 * given a {@link InternalThing} and a {@link PluginAdapter} to create it for.
 */
export const PluginThingFactory: Identifier<PluginThingFactory> = createSymbol(
  "PluginThingFactory",
);

/**
 * Defines the PluginThingFactory service.
 *
 * The PluginThingFactory service is responsible for creating {@link PluginThing}s and {@link OwnedPluginThing}s
 * given a {@link InternalThing} and a {@link PluginAdapter} to create it for.
 */
export interface PluginThingFactory {
  /**
   * Gets a {@link PluginThing} or {@link OwnedPluginThing} for the specified Thing
   * requested by the given plugin.
   * @param thing The thing to create the PluginThing for.
   * @param pluginAdapter The plugin adapter owning the plugin for which to create the PluginThing for.
   */
  getPluginThing(
    thing: InternalThing,
    pluginAdapter: PluginAdapter,
  ): PluginThing | OwnedPluginThing;
}
