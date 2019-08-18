import { Thing, MozIotPluginContext } from "homectrl-moziot";
import { injectable, singleton, provides, inject } from "microinject";

import {
  CommandClasses,
  ZWaveValue,
  ZWaveEventSource,
  ZWave
} from "../../../ZWave";

import { PropertyMonitorFactory } from "../PropertyMonitorFactory";
import { PropertyMonitor } from "../PropertyMonitor";

import { BinarySwitchPropertyMonitorImpl } from "./BinarySwitchPropertyMonitorImpl";
import { MultiLevelSwitchPropertyMonitorImpl } from "./MultiLevelSwitchPropertyMonitorImpl";

@injectable()
@singleton()
@provides(PropertyMonitorFactory)
export class PropertyMonitorFactoryImpl implements PropertyMonitorFactory {
  constructor(
    @inject(ZWave) private _zwave: ZWave,
    @inject(ZWaveEventSource) private _zwaveEvents: ZWaveEventSource
  ) {}

  tryCreateMonitor(
    thing: Thing,
    value: ZWaveValue,
    plugin: MozIotPluginContext
  ): PropertyMonitor | null {
    if (
      value.class_id === CommandClasses.SWITCH_BINARY &&
      value.instance === 1 &&
      value.index === 0
    ) {
      return new BinarySwitchPropertyMonitorImpl(
        value,
        thing,
        this._zwave,
        this._zwaveEvents,
        plugin
      );
    } else if (
      value.class_id === CommandClasses.SWITCH_MULTILEVEL &&
      value.instance === 1 &&
      value.index === 0
    ) {
      return new MultiLevelSwitchPropertyMonitorImpl(
        value,
        thing,
        this._zwave,
        this._zwaveEvents,
        plugin
      );
    }

    return null;
  }
}
