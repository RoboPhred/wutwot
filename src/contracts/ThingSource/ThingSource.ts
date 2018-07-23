import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { ThingDef } from "./types";

export const ThingSource: Identifier<ThingSource> = createSymbol("ThingSource");
export interface ThingSource {
  readonly id: string;

  readonly things: ReadonlyArray<ThingDef>;

  on(event: "thing.add", handler: (e: { thing: ThingDef }) => void): void;
  on(event: "thing.remove", handler: (e: { thing: ThingDef }) => void): void;
}
