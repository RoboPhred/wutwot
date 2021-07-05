import { injectable, provides, singleton, inject } from "microinject";

import { ThingsManager, InternalThing } from "../../things";

import { PluginThing, OwnedPluginThing } from "../types";

import { PluginThingFactory } from "../components/PluginThingFactory";

import { PluginThingImpl } from "./PluginThingImpl";
import { WutWotPlugin } from "../contracts";

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
    plugin: WutWotPlugin,
  ): PluginThing | OwnedPluginThing {
    return new PluginThingImpl(thing, plugin, this._thingsManager);
  }
}
