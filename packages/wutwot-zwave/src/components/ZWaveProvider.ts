import { Identifier } from "microinject";
import { ZWaveController } from "zwave-js";
import createSymbol from "../create-symbol";

export const ZWaveProvider: Identifier<ZWaveProvider> = createSymbol(
  "ZWaveProvider",
);
export interface ZWaveProvider {
  getController(): Promise<ZWaveController>;
}
