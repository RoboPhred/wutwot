import { Identifier } from "microinject";
import { Thing } from "../types";
import { ThingRegistry } from "./ThingRegistry";
export declare const ThingRepository: Identifier<ThingRepository>;
export interface ThingRepository extends ThingRegistry {
    addThing(thing: Thing): void;
    removeThing(thingId: string): void;
}
