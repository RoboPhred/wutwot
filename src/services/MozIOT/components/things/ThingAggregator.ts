import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";
import { ThingSource } from "../../contracts";

export const ThingAggregator: Identifier<ThingAggregator> = createSymbol(
  "ThingAggregator"
);
export interface ThingAggregator extends ThingSource {}
