import { Identifier } from "microinject";
import { ThingContext } from "../contracts";
export declare const ThingRepository: Identifier<ThingRepository>;
export interface ThingRepository {
    addThing(thing: ThingContext): void;
    removeThing(thingId: string): void;
}
