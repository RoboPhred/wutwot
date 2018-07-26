import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";
import { ActionSource } from "../../contracts/ActionSource";

export const ActionAggregator: Identifier<ActionSource> = createSymbol(
  "ActionAggregator"
);
export interface ActionAggregator extends ActionSource {}
