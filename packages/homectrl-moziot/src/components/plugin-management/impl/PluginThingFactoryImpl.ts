import { injectable, provides, singleton, inject } from "microinject";

import { ThingManager, InternalThing } from "../../things";
import { ThingTypeService } from "../../thing-types";
import { ActionService } from "../../actions";
import { EventService } from "../../thing-events";

import { PluginThing, OwnedPluginThing, PluginAdapter } from "../types";

import { PluginThingFactory } from "../components/PluginThingFactory";
import { PluginThingActionFactory } from "../components/PluginThingActionFactory";

import { PluginThingImpl } from "./PluginThingImpl";

@injectable()
@singleton()
@provides(PluginThingFactory)
export class PluginThingFactoryImpl implements PluginThingFactory {
  constructor(
    @inject(ThingManager)
    private _thingManager: ThingManager,
    @inject(ThingTypeService)
    private _thingTypeService: ThingTypeService,
    @inject(ActionService)
    private _actionService: ActionService,
    @inject(EventService)
    private _eventService: EventService,
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
      this._thingManager,
      this._thingTypeService,
      this._actionService,
      this._eventService,
      this._pluginThingActionFactory
    );
  }
}
