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
import { ColorPropertyMonitorImpl } from "./ColorPropertyMonitorImpl";

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
    if (value.instance !== 1 || value.index !== 0) {
      return null;
    }

    switch (value.class_id) {
      case CommandClasses.SWITCH_BINARY:
        return new BinarySwitchPropertyMonitorImpl(
          value,
          thing,
          this._zwave,
          this._zwaveEvents,
          plugin
        );
      case CommandClasses.SWITCH_MULTILEVEL:
        return new MultiLevelSwitchPropertyMonitorImpl(
          value,
          thing,
          this._zwave,
          this._zwaveEvents,
          plugin
        );
      case CommandClasses.COLOR:
        return new ColorPropertyMonitorImpl(
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
