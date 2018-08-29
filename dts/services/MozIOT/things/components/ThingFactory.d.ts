import { Identifier } from "microinject";
import { ThingDef, Thing } from "../types";
export declare const ThingFactory: Identifier<ThingFactory>;
export interface ThingFactory {
    createThing(def: ThingDef, owner: object): Thing;
}
