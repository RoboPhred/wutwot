import { Identifier } from "microinject";
import { WutWotPlugin } from "@wutwot/core";

import { createSymbol } from "./create-symbol";

export const WutWotPluginEnumerator: Identifier<WutWotPluginEnumerator> = createSymbol(
  "plugin-enumerator",
);
export interface WutWotPluginEnumerator {
  readonly plugins: WutWotPlugin[];
}
