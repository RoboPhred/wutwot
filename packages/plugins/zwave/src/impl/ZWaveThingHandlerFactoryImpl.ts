import { injectable, provides, singleton, inject } from "microinject";
import { PluginThingsManager } from "@wutwot/core";
import { Endpoint } from "zwave-js";

import { ZWaveEndpointMonitorFactory } from "../contracts";
import {
  ZWaveThingHandlerFactory,
  ZWaveThingHandler,
  ZWavePluginThingManager,
} from "../components";

import { ZWaveEndpointThingHandlerImpl } from "./ZWaveEndpointThingHandlerImpl";

@injectable()
@provides(ZWaveThingHandlerFactory)
@singleton()
export class ZWaveThingHandlerFactoryImpl implements ZWaveThingHandlerFactory {
  constructor(
    @inject(ZWavePluginThingManager)
    private _thingsManager: PluginThingsManager,
    @inject(ZWaveEndpointMonitorFactory, { all: true })
    private _monitorFactories: ZWaveEndpointMonitorFactory[],
  ) {}

  createEndpointHandler(endpoint: Endpoint): ZWaveThingHandler {
    return new ZWaveEndpointThingHandlerImpl(
      endpoint,
      this._thingsManager,
      this._monitorFactories,
    );
  }
}
