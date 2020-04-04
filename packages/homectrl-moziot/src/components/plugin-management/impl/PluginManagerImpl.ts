import { inject, injectable, singleton, provides } from "microinject";

import { Initializable } from "../../../contracts";

import { MozIotPlugin, PluginAdapter } from "../types";
import { PluginAdapterFactory } from "../components";

import { PluginManager } from "../services/PluginManager";

@injectable()
@singleton()
@provides(PluginManager)
@provides(Initializable)
export class PluginManagerImpl implements PluginManager, Initializable {
  private _initialized = false;
  private readonly _adapters = new Set<PluginAdapter>();

  constructor(
    @inject(PluginAdapterFactory)
    private _pluginAdapterFactory: PluginAdapterFactory
  ) {}

  initialize() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
    this._adapters.forEach(adapter => adapter.initialize());
  }

  registerPlugin(plugin: MozIotPlugin): void {
    const adapter = this._pluginAdapterFactory.createPluginAdapter(plugin);
    this._adapters.add(adapter);
    if (this._initialized) {
      adapter.initialize();
    }
  }
}
