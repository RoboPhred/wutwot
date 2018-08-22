import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingDef, ThingContext } from "./types";

export const ThingProviderPlugin: Identifier<
  ThingProviderPlugin
> = createSymbol("ThingProviderPlugin");
export interface ThingProviderPlugin {
  readonly id: string;

  onRegisterThingProvider(plugin: ThingProviderPluginAdapter): void;
}

export interface ThingProviderPluginAdapter {
  addThing(def: ThingDef): ThingContext;
  removeThing(thingId: string): void;
}
