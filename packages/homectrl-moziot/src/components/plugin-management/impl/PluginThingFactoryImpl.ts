import { injectable, provides, singleton, inject } from "microinject";

import { ThingsManager, InternalThing } from "../../things";
import { ActionService } from "../../actions";

import { PluginThing, OwnedPluginThing, PluginAdapter } from "../types";

import { PluginThingFactory } from "../components/PluginThingFactory";
import { PluginThingActionFactory } from "../components/PluginThingActionFactory";

import { PluginThingImpl } from "./PluginThingImpl";

@injectable()
@singleton()
@provides(PluginThingFactory)
export class PluginThingFactoryImpl implements PluginThingFactory {
  constructor(
    @inject(ThingsManager)
    private _thingsManager: ThingsManager,
    @inject(ActionService)
    private _actionService: ActionService,
    @inject(PluginThingActionFactory)
    private _pluginThingActionFactory: PluginThingActionFactory
  ) {}

  getPluginThing(
    thing: InternalThing,
    pluginAdapter: PluginAdapter
  ): PluginThing | OwnedPluginThing {
    return new PluginThingImpl(
      thing,
      pluginAdapter,
      this._thingsManager,
      this._actionService,
      this._pluginThingActionFactory
    );
  }
}
