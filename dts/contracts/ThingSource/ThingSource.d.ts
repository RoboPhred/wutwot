import { Identifier } from "microinject";
import { ThingDef } from "./types";
export declare const ThingSource: Identifier<ThingSource>;
export interface ThingSource {
    readonly id: string;
    readonly things: ReadonlyArray<ThingDef>;
    on(event: "thing.add", handler: (e: {
        thing: ThingDef;
    }) => void): void;
    on(event: "thing.remove", handler: (e: {
        thing: ThingDef;
    }) => void): void;
}
