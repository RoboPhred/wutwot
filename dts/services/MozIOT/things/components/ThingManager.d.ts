import { Identifier } from "microinject";
import { Thing } from "./Thing";
export declare const ThingManager: Identifier<ThingManager>;
export interface ThingManager {
    things: ReadonlyArray<Thing>;
    on(event: "thing.add", handler: (e: ThingAddedEventArgs) => void): this;
    on(event: "thing.remove", handler: (e: ThingRemovedEventArgs) => void): this;
}
export interface ThingAddedEventArgs {
    thingId: string;
    thing: Thing;
}
export interface ThingRemovedEventArgs {
    thingId: string;
}
