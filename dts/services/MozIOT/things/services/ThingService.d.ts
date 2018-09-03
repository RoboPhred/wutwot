import { Identifier } from "microinject";
import { ThingDef, Thing } from "../types";
export declare const ThingService: Identifier<ThingService>;
export interface ThingService {
    addThing(def: ThingDef, owner: object): Thing;
    removeThing(thingId: string): void;
    getThing(thingId: string): Thing | undefined;
    getThings(): Thing[];
}
