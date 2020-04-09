import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

/**
 * Tracks zwave endpoints on the controller and produces {@link ZWaveEndpointHandler}s for them.
 */
export const ZWaveEndpointThingMapper: Identifier<ZWaveEndpointThingMapper> = createSymbol(
  "ZWaveEndpointThingMapper",
);
export interface ZWaveEndpointThingMapper {}
