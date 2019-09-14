import { Identifier } from "microinject";

import { Thing, MozIotPluginContext } from "../../MozIot";
import { ZWaveValue } from "../../ZWave";

import createSymbol from "../create-symbol";

import { PropertyMonitor } from "./PropertyMonitor";

export const PropertyMonitorFactory: Identifier<
  PropertyMonitorFactory
> = createSymbol("PropertyMonitorFactory");
export interface PropertyMonitorFactory {
  tryCreateMonitor(
    thing: Thing,
    value: ZWaveValue,
    // TODO: Plugin is rather globalish, should be scope-injected
    plugin: MozIotPluginContext
  ): PropertyMonitor | null;
}
