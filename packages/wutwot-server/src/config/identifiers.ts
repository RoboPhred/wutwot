import { Identifier } from "microinject";
import { createSymbol } from "./create-symbol";

export const WutWotPluginConfig: Identifier<string> = createSymbol("Plugins");
