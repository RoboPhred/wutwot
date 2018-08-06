import { Identifier } from "microinject";
import { Thing } from "../Thing";
export declare const ThingManager: Identifier<ThingManager>;
export interface ThingManager {
    things: ReadonlyArray<Thing>;
}
