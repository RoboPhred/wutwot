import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingDef } from "./types";

export const ThingSource: Identifier<ThingSource> = createSymbol("ThingSource");
export interface ThingSource {
  readonly id: string;

  readonly things: ReadonlyArray<ThingDef>;
}
