import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const ZThingManager: Identifier<ZThingManager> = createSymbol(
  "ZThingManager"
);
export interface ZThingManager {}
