import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

import { Thing } from "../Thing";

export const ThingManager: Identifier<ThingManager> = createSymbol(
  "ThingManager"
);
export interface ThingManager {
  things: ReadonlyArray<Thing>;

  on(event: "thing.add", handler: (thing: Thing) => void): void;
  on(event: "thing.remove", handler: (thing: Thing) => void): void;
}
