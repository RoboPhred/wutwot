import type { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const ExpressController: Identifier<ExpressController> = createSymbol(
  "ExpressController",
);
export interface ExpressController {}
