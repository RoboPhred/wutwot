import { injectable, provides, singleton, inject } from "microinject";
import { PluginThingManager } from "homectrl-moziot";
import { ZWaveNode } from "zwave-js";

import { ZThingMonitorFactory } from "../../contracts";

import { ZThingAdapterFactory } from "../ZThingAdapterFactory";
import { ZThingAdapter } from "../ZThingAdapter";

import { ZThingAdapterImpl } from "./ZThingAdapterImpl";

@injectable()
@provides(ZThingAdapterFactory)
@singleton()
export class ZThingAdapterFactoryImpl implements ZThingAdapterFactory {
  constructor(
    @inject(PluginThingManager) private _pluginThingManager: PluginThingManager,
    @inject(ZThingMonitorFactory, { all: true })
    private _monitorFactories: ZThingMonitorFactory[]
  ) {}

  createAdapter(node: ZWaveNode): ZThingAdapter {
    return new ZThingAdapterImpl(
      node,
      this._pluginThingManager,
      this._monitorFactories
    );
  }
}
