import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

/**
 * Tracks zwave endpoints on the controller and produces {@link ZWaveThingHandler}s for them.
 */
export const ZWaveThingMapper: Identifier<ZWaveThingMapper> = createSymbol(
  "ZWaveThingMapper",
);
export interface ZWaveThingMapper {}
