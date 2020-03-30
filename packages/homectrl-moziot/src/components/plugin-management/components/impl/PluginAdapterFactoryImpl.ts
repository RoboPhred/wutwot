import {
  injectable,
  provides,
  inject,
  singleton,
  Container
} from "microinject";

import { ThingService } from "../../../things";

import { MozIotPlugin, PluginAdapter } from "../../types";

import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginThingFactory } from "../PluginThingFactory";

import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(Container) private _container: Container,
    @inject(ThingService) private _thingService: ThingService,
    @inject(PluginThingFactory) private _pluginThingFactory: PluginThingFactory
  ) {}

  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._container,
      this._thingService,
      this._pluginThingFactory
    );
  }
}
