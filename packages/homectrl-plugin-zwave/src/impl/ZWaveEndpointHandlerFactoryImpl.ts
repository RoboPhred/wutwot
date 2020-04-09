import { injectable, provides, singleton, inject } from "microinject";
import { PluginThingsManager } from "homectrl-moziot";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";

import { ZWaveEndpointMonitorFactory } from "../contracts";
import {
  ZWaveEndpointHandlerFactory,
  ZWaveEndpointHandler,
} from "../components";

import { ZWaveEndpointHandlerImpl } from "./ZWaveEndpointHandlerImpl";

@injectable()
@provides(ZWaveEndpointHandlerFactory)
@singleton()
export class ZWaveEndpointHandlerFactoryImpl
  implements ZWaveEndpointHandlerFactory {
  constructor(
    @inject(PluginThingsManager) private _thingsManager: PluginThingsManager,
    @inject(ZWaveEndpointMonitorFactory, { all: true })
    private _monitorFactories: ZWaveEndpointMonitorFactory[],
  ) {}

  createHandler(endpoint: Endpoint): ZWaveEndpointHandler {
    return new ZWaveEndpointHandlerImpl(
      endpoint,
      this._thingsManager,
      this._monitorFactories,
    );
  }
}
