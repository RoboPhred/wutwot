import { inScope } from "microinject";

import createSymbol from "../../../create-symbol";

export const PluginScope = createSymbol("PluginScope");

export function inPluginScope(): ClassDecorator {
  return inScope(PluginScope);
}
