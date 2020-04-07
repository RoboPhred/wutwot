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
  private readonly _adaptersByPluginId = new Map<string, PluginAdapter>();

  constructor(
    @inject(PluginAdapterFactory)
    private _pluginAdapterFactory: PluginAdapterFactory
  ) {}

  onInitialize() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
    this._adaptersByPluginId.forEach((adapter) => adapter.initialize());
  }

  registerPlugin(plugin: MozIotPlugin): void {
    if (this._adaptersByPluginId.has(plugin.id)) {
      throw new Error(
        `A plugin with id "${plugin.id}" already exists.  Please reconfigure the plugin to use a different ID.`
      );
    }

    const adapter = this._pluginAdapterFactory.createPluginAdapter(plugin);
    this._adaptersByPluginId.set(plugin.id, adapter);
    if (this._initialized) {
      adapter.initialize();
    }
  }
}
