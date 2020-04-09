import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { Identifier } from "microinject";
import { PluginThing } from "homectrl-moziot";

import createSymbol from "../create-symbol";

import { ZWaveEndpointMonitor } from "../types/ZWaveEndpointMonitor";

export const ZWaveEndpointMonitorFactory: Identifier<ZWaveEndpointMonitorFactory> = createSymbol(
  "ZWaveEndpointMonitorFactory",
);
export interface ZWaveEndpointMonitorFactory {
  createMonitor(
    endpoint: Endpoint,
    thing: PluginThing,
  ): ZWaveEndpointMonitor | null;
}
