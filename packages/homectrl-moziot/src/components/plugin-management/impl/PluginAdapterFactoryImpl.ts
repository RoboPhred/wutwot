import {
  injectable,
  provides,
  inject,
  singleton,
  Container
} from "microinject";

import { ThingsManager } from "../../things";

import { MozIotPlugin, PluginAdapter } from "../types";

import { PluginAdapterFactory } from "../components/PluginAdapterFactory";
import { PluginThingFactory } from "../components/PluginThingFactory";

import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(Container) private _container: Container,
    @inject(ThingsManager) private _thingManager: ThingsManager,
    @inject(PluginThingFactory) private _pluginThingFactory: PluginThingFactory
  ) {}

  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._container,
      this._thingManager,
      this._pluginThingFactory
    );
  }
}
