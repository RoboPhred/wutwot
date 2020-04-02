import { Identifier } from "microinject";
import { createSymbol } from "./create-symbol";

export const RootURL: Identifier<string> = createSymbol("RootURL");
export const Port: Identifier<number> = createSymbol("Port");
export const CorsOrigin: Identifier<string> = createSymbol("CorsOrigin");

export const ZWavePort: Identifier<string> = createSymbol("ZWavePort");