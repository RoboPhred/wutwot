import { Driver } from "zwave-js";
import { Identifier } from "microinject";
import createSymbol from "../../MozIot/create-symbol";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";

export const ZWaveDriver: Identifier<Driver> = createSymbol("ZWaveDriver");
export interface ZWaveDriver {
  readonly controller: ZWaveController;

  connect(port: string): Promise<void>;
}
