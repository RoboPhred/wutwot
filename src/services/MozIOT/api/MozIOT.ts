import { Identifier } from "microinject";

import { ReadonlyRecord } from "../../../types";

import createSymbol from "../create-symbol";

import { Thing } from "./Thing";

export const MozIOT: Identifier<MozIOT> = createSymbol("MozIOT");
export interface MozIOT {
  things: ReadonlyRecord<string, Thing>;
}
