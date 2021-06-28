import createSymbol from "./create-symbol";
import { Identifier } from "microinject";

export const ZWavePort: Identifier<string> = createSymbol(
  "Config",
  "ZWavePort",
);
