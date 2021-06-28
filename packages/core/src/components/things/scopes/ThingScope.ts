import { inScope, asScope } from "microinject";

import createSymbol from "../../../create-symbol";

export const ThingScope = createSymbol("ThingScope");

export function inThingScope(): ClassDecorator {
  return inScope(ThingScope);
}

export function asThingScope(): ClassDecorator {
  return asScope(ThingScope);
}
