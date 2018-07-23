import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ThingDef } from "../../../contracts/ThingSource";

export const ThingDefParam: Identifier<ThingDef> = createSymbol(
  "ThingDefParam"
);
