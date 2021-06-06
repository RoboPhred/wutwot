import { Identifier } from "microinject";
import { createSymbol } from "./create-symbol";

export const WutWotPluginConfig: Identifier<string> = createSymbol("Plugins");

export const Hostname: Identifier<string> = createSymbol("Hostname");
export const Port: Identifier<number> = createSymbol("Port");
export const CorsOrigin: Identifier<string> = createSymbol("CorsOrigin");

export const ZWavePort: Identifier<string> = createSymbol("ZWavePort");
