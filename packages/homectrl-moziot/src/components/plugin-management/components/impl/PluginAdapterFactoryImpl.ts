import { injectable, provides, inject, singleton } from "microinject";

import { ThingService } from "../../../things";
import { ThingTypeService } from "../../../thing-types";

import { MozIotPlugin } from "../../contracts";

import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";
import { PluginThingFactory } from "../PluginThingFactory";

import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(ThingService) private _thingService: ThingService,
    @inject(ThingTypeService) private _typeService: ThingTypeService,
    @inject(PluginThingFactory) private _pluginThingFactory: PluginThingFactory
  ) {}

  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._thingService,
      this._pluginThingFactory
    );
  }
}
