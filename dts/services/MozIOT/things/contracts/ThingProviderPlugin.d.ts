import { Identifier } from "microinject";
import { ThingDef, ThingContext } from "./types";
export declare const ThingProviderPlugin: Identifier<ThingProviderPlugin>;
export interface ThingProviderPlugin {
    readonly id: string;
    onRegisterThingProvider(plugin: ThingProviderPluginAdapter): void;
}
export interface ThingProviderPluginAdapter {
    addThing(def: ThingDef): ThingContext;
    removeThing(thingId: string): void;
}
