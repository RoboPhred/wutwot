import { Identifier } from "microinject";
import { ThingContext } from "../contracts";
import { Thing } from "./Thing";
export declare const ThingFactory: Identifier<ThingFactory>;
export interface ThingFactory {
    createThing(context: ThingContext): Thing;
}
