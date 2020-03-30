import { Identifier } from "microinject";
import { ZWaveController } from "zwave-js/build/lib/controller/Controller";
import createSymbol from "../create-symbol";

export const ZWaveProvider: Identifier<ZWaveProvider> = createSymbol(
  "ZWaveProvider"
);
export interface ZWaveProvider {
  getController(): Promise<ZWaveController>;
}
