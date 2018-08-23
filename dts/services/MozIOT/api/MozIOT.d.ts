import { Identifier } from "microinject";
import { ReadonlyRecord } from "../../../types";
import { Thing } from "./Thing";
export declare const MozIOT: Identifier<MozIOT>;
export interface MozIOT {
    things: ReadonlyRecord<string, Thing>;
}
