import { Identifier } from "microinject";
import { ThingContext } from "../contracts";
export declare const ThingRegistry: Identifier<ThingRegistry>;
export interface ThingRegistry {
    readonly things: ReadonlyArray<ThingContext>;
    get(thingId: string): ThingContext | undefined;
    on(event: "thing.add", handler: (e: ThingAddedEventArgs) => void): this;
    on(event: "thing.remove", handler: (e: ThingRemovedEventArgs) => void): this;
}
export interface ThingAddedEventArgs {
    thingId: string;
    thing: ThingContext;
}
export interface ThingRemovedEventArgs {
    thingId: string;
}
