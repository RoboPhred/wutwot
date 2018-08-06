import { Identifier } from "microinject";
import { ThingDef } from "./types";
export declare const ThingSource: Identifier<ThingSource>;
export interface ThingSource {
    readonly id: string;
    readonly things: ReadonlyArray<ThingDef>;
}
