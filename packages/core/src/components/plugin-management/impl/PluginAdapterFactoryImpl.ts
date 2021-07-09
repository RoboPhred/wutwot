import {
  injectable,
  provides,
  inject,
  singleton,
  Container,
} from "microinject";

import { ThingsManager } from "../../things";

import { WutWotPlugin } from "../types";

import {
  PluginAdapterFactory,
  PluginThingFactory,
  PluginAdapter,
} from "../components";

import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(Container) private _container: Container,
    @inject(ThingsManager) private _thingManager: ThingsManager,
    @inject(PluginThingFactory) private _pluginThingFactory: PluginThingFactory,
  ) {}

  createPluginAdapter(plugin: WutWotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._container,
      this._thingManager,
      this._pluginThingFactory,
    );
  }
}
