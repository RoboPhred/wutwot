import { Identifier } from "microinject";
import { ThingDef } from "../../contracts/ThingSource";
import { Thing } from "./Thing";
export declare const ThingFactory: Identifier<ThingFactory>;
export interface ThingFactory {
    createThing(def: ThingDef): Thing;
}
