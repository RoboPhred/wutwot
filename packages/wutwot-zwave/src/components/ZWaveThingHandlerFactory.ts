import { ZWaveNode } from "zwave-js";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { ZWaveThingHandler } from "./ZWaveThingHandler";

export const ZWaveThingHandlerFactory: Identifier<ZWaveThingHandlerFactory> = createSymbol(
  "ZWaveThingHandlerFactory",
);
export interface ZWaveThingHandlerFactory {
  createEndpointHandler(endpoint: Endpoint): ZWaveThingHandler;
  createDeadNodeHandler(node: ZWaveNode): ZWaveThingHandler;
}
