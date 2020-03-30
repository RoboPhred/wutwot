import { injectable, provides, singleton, inject } from "microinject";

import { Thing, ThingService } from "../../../things";
import { ThingTypeService } from "../../../thing-types";
import { ActionService } from "../../../actions";
import { PropertyService } from "../../../properties";

import { PluginThing, OwnedPluginThing, PluginAdapter } from "../../types";

import { PluginThingFactory } from "../PluginThingFactory";
import { PluginThingActionFactory } from "../PluginThingActionFactory";

import { PluginThingImpl } from "./PluginThingImpl";

@injectable()
@singleton()
@provides(PluginThingFactory)
export class PluginThingFactoryImpl implements PluginThingFactory {
  constructor(
    @inject(ThingService)
    private _thingService: ThingService,
    @inject(ThingTypeService)
    private _thingTypeService: ThingTypeService,
    @inject(ActionService)
    private _actionService: ActionService,
    @inject(PropertyService)
    private _propertyService: PropertyService,
    @inject(PluginThingActionFactory)
    private _pluginThingActionFactory: PluginThingActionFactory
  ) {}

  getPluginThing(
    thing: Thing,
    pluginAdapter: PluginAdapter
  ): PluginThing | OwnedPluginThing {
    return new PluginThingImpl(
      thing,
      pluginAdapter,
      this._thingService,
      this._thingTypeService,
      this._actionService,
      this._propertyService,
      this._pluginThingActionFactory
    );
  }
}
