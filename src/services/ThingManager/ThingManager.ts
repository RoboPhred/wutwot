import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { Thing } from "../Thing";

export const ThingManager: Identifier<ThingManager> = createSymbol(
  "ThingManager"
);
export interface ThingManager {
  things: ReadonlyArray<Thing>;
}
