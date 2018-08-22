import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

export const ThingPluginManager: Identifier<ThingPluginManager> = createSymbol(
  "ThingPluginManager"
);
export interface ThingPluginManager {
  run(): void;
}
