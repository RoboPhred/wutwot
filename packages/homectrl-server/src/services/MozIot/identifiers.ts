import { Identifier } from "microinject";
import { MozIotPlugin as IMozIotPlugin } from "homectrl-moziot";

import { createSymbol } from "./create-symbol";

export type MozIotPlugin = IMozIotPlugin;
export const MozIotPlugin: Identifier<IMozIotPlugin> = createSymbol(
  "MozIotPlugin",
);
