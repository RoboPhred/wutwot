import { injectable, provides, singleton, inject } from "microinject";

import { ThingsManager, InternalThing } from "../../things";

import { PluginThing, OwnedPluginThing, PluginAdapter } from "../types";

import { PluginThingFactory } from "../components/PluginThingFactory";

import { PluginThingImpl } from "./PluginThingImpl";

@injectable()
@singleton()
@provides(PluginThingFactory)
export class PluginThingFactoryImpl implements PluginThingFactory {
  constructor(
    @inject(ThingsManager)
    private _thingsManager: ThingsManager,
  ) {}

  getPluginThing(
    thing: InternalThing,
    pluginAdapter: PluginAdapter,
  ): PluginThing | OwnedPluginThing {
    return new PluginThingImpl(thing, pluginAdapter, this._thingsManager);
  }
}
