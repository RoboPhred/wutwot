import { ZWaveNode } from "zwave-js";
import { Identifier } from "microinject";
import { PluginThing } from "homectrl-moziot";

import createSymbol from "../create-symbol";

import { ZThingMonitor } from "../types/ZThingMonitor";

export const ZThingMonitorFactory: Identifier<ZThingMonitorFactory> = createSymbol(
  "ZThingMonitorFactory"
);
export interface ZThingMonitorFactory {
  createMonitor(node: ZWaveNode, thing: PluginThing): ZThingMonitor | null;
}
