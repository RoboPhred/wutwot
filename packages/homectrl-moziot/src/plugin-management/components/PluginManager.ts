import { MozIotPlugin } from "../contracts";
import { Identifier } from "microinject";
import createSymbol from "../../create-symbol";

export const PluginManager: Identifier<PluginManager> = createSymbol(
  "PluginManager"
);
export interface PluginManager {
  registerPlugin(plugin: MozIotPlugin): void;
}
