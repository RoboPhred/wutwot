import { inScope, asScope } from "microinject";

import createSymbol from "../../../create-symbol";

export const ActionScope = createSymbol("ActionScope");

export function inActionScope(): ClassDecorator {
  return inScope(ActionScope);
}

export function asActionScope(): ClassDecorator {
  return asScope(ActionScope);
}
