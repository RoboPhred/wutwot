import { Identifier } from "microinject";
import createSymbol from "../create-symbol";
import { ZWaveEventEmitter } from "../events";

export const ZWaveEventSource: Identifier<ZWaveEventSource> = createSymbol(
  "ZWaveEventSource"
);
export interface ZWaveEventSource extends ZWaveEventEmitter {}
