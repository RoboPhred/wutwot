import { injectable, provides, singleton, inject } from "microinject";
import { PluginThingsManager } from "@wutwot/core";
import { Endpoint } from "zwave-js/build/lib/node/Endpoint";
import { ZWaveNode } from "zwave-js";

import { ZWaveEndpointMonitorFactory } from "../contracts";
import { ZWaveThingHandlerFactory, ZWaveThingHandler } from "../components";

import { ZWaveEndpointThingHandlerImpl } from "./ZWaveEndpointThingHandlerImpl";
import { ZWaveDeadNodeHandlerImpl } from "./ZWaveDeadNodeThingHandlerImpl";

@injectable()
@provides(ZWaveThingHandlerFactory)
@singleton()
export class ZWaveThingHandlerFactoryImpl implements ZWaveThingHandlerFactory {
  constructor(
    @inject(PluginThingsManager) private _thingsManager: PluginThingsManager,
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

  createDeadNodeHandler(node: ZWaveNode) {
    return new ZWaveDeadNodeHandlerImpl(node, this._thingsManager);
  }
}
