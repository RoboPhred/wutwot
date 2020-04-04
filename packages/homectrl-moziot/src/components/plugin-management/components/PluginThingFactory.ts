import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { InternalThing } from "../../things";

import { PluginThing, OwnedPluginThing, PluginAdapter } from "../types";

export const PluginThingFactory: Identifier<PluginThingFactory> = createSymbol(
  "PluginThingFactory"
);
export interface PluginThingFactory {
  getPluginThing(
    thing: InternalThing,
    pluginAdapter: PluginAdapter
  ): PluginThing | OwnedPluginThing;
}
