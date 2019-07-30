import { Identifier } from "microinject";
import { ValueId } from "openzwave-shared";

import createSymbol from "../../create-symbol";

export const ZWave: Identifier<ZWave> = createSymbol("ZWave");
export interface ZWave {
  start(): void;

  enablePolling(valueId: ValueId): void;
}
