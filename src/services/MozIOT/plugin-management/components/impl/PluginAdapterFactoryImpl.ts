import { injectable, provides, inject, singleton } from "microinject";

import { ThingFactory, ThingRepository } from "../../../things/components";

import { MozIotPlugin } from "../../contracts";

import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginAdapter } from "../PluginAdapter";
import { PluginAdapterImpl } from "./PluginAdapterImpl";

@injectable()
@singleton()
@provides(PluginAdapterFactory)
export class PluginAdapterFactoryImpl implements PluginAdapterFactory {
  constructor(
    @inject(ThingFactory) private _thingFactory: ThingFactory,
    @inject(ThingRepository) private _thingRepository: ThingRepository
  ) {}

  createPluginAdapter(plugin: MozIotPlugin): PluginAdapter {
    return new PluginAdapterImpl(
      plugin,
      this._thingFactory,
      this._thingRepository
    );
  }
}
