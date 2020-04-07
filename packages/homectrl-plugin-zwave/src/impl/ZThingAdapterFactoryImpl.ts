import { injectable, provides, singleton, inject } from "microinject";
import { PluginThingsManager } from "homectrl-moziot";
import { ZWaveNode } from "zwave-js";

import { ZThingMonitorFactory } from "../contracts";

import { ZThingAdapterFactory } from "../components/ZThingAdapterFactory";
import { ZThingAdapter } from "../components/ZThingAdapter";

import { ZThingAdapterImpl } from "./ZThingAdapterImpl";

@injectable()
@provides(ZThingAdapterFactory)
@singleton()
export class ZThingAdapterFactoryImpl implements ZThingAdapterFactory {
  constructor(
    @inject(PluginThingsManager) private _thingsManager: PluginThingsManager,
    @inject(ZThingMonitorFactory, { all: true })
    private _monitorFactories: ZThingMonitorFactory[],
  ) {}

  createAdapter(node: ZWaveNode): ZThingAdapter {
    return new ZThingAdapterImpl(
      node,
      this._thingsManager,
      this._monitorFactories,
    );
  }
}
