import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { ZWaveEndpointHandler } from "./ZWaveEndpointHandler";

export const ZWaveEndpointHandlerFactory: Identifier<ZWaveEndpointHandlerFactory> = createSymbol(
  "ZWaveEndpointHandlerFactory",
);
export interface ZWaveEndpointHandlerFactory {
  createHandler(endpoint: Endpoint): ZWaveEndpointHandler;
}
