import { Identifier } from "microinject";
import { WutWotPlugin as IWutWotPlugin } from "@wutwot/core";

import { createSymbol } from "./create-symbol";

export type WutWotPlugin = IWutWotPlugin;
export const WutWotPlugin: Identifier<IWutWotPlugin> = createSymbol(
  "WutWotPlugin",
);
