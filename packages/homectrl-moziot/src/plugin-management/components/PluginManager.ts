import { Identifier } from "microinject";
import createSymbol from "../../create-symbol";
import { MozIotPlugin } from "../contracts";

export const PluginManager: Identifier<PluginManager> = createSymbol(
  "PluginManager"
);
export interface PluginManager {
  registerPlugin(plugin: MozIotPlugin): void;
}
