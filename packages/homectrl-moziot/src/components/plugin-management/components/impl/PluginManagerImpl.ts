import { inject, injectable, singleton, provides } from "microinject";

import { MozIotPlugin } from "../../types";

import { PluginAdapter } from "../PluginAdapter";
import { PluginAdapterFactory } from "../PluginAdapterFactory";
import { PluginManager } from "../PluginManager";

@injectable()
@singleton()
@provides(PluginManager)
export class PluginManagerImpl implements PluginManager {
  private readonly _adapters = new Set<PluginAdapter>();

  constructor(
    @inject(PluginAdapterFactory)
    private _pluginAdapterFactory: PluginAdapterFactory
  ) {}

  registerPlugin(plugin: MozIotPlugin): void {
    const adapter = this._pluginAdapterFactory.createPluginAdapter(plugin);
    this._adapters.add(adapter);
  }
}
