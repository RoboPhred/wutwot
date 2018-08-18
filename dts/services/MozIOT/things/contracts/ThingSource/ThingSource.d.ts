import { Identifier } from "microinject";
import { ThingDef } from "./types";
export declare const ThingSource: Identifier<ThingSource>;
export interface ThingSource {
    readonly id: string;
    readonly things: ReadonlyArray<ThingDef>;
    on(event: "thing.add", handler: (e: ThingDefEventArgs) => void): this;
    on(event: "thing.remove", handler: (e: ThingIdEventArgs) => void): this;
    on(event: string, handler: Function): this;
}
export interface ThingIdEventArgs {
    thingId: string;
}
export interface ThingDefEventArgs extends ThingIdEventArgs {
    thingDef: ThingDef;
}
