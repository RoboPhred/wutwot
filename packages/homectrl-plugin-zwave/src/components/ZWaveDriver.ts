import { ZWaveController } from "zwave-js/build/lib/controller/Controller";
import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const ZWaveDriver: Identifier<ZWaveDriver> = createSymbol("ZWaveDriver");
export interface ZWaveDriver {
  readonly controller: ZWaveController;

  connect(port: string): Promise<void>;
}
