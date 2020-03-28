import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../../things";

import { PluginThing, OwnedPluginThing } from "../contracts/PluginThing";

import { PluginAdapter } from "./PluginAdapter";

export const PluginThingFactory: Identifier<PluginThingFactory> = createSymbol(
  "PluginThingFactory"
);
export interface PluginThingFactory {
  getPluginThing(
    thing: Thing,
    pluginAdapter: PluginAdapter
  ): PluginThing | OwnedPluginThing;
}
