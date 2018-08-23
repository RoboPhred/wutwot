import { Identifier } from "microinject";

import createSymbol from "../../create-symbol";

export const ActionPluginManager: Identifier<
  ActionPluginManager
> = createSymbol("ActionPluginManager");
export interface ActionPluginManager {
  run(): void;
}
