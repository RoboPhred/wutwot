import { Identifier } from "microinject";
import { Thing } from "../Thing";
export declare const ThingManager: Identifier<ThingManager>;
export interface ThingManager {
    things: ReadonlyArray<Thing>;
    on(event: "thing.add", handler: (thing: Thing) => void): void;
    on(event: "thing.remove", handler: (thing: Thing) => void): void;
}
