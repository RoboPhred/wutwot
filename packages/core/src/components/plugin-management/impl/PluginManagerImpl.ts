import {
  inject,
  injectable,
  singleton,
  provides,
  Container,
} from "microinject";

import { Initializable } from "../../../contracts";

import { DuplicateIDError } from "../../id-mapping";

import { PluginsManager } from "../services/PluginsManager";

import { WutWotPlugin } from "../contracts";
import { PluginBinder, PluginBinderParameters } from "../services";

@injectable()
@singleton()
@provides(PluginsManager)
@provides(Initializable)
export class PluginManagerImpl implements PluginsManager, Initializable {
  private _initialized = false;
  private readonly _pluginData = new Map<string, PluginBinder>();

  constructor(@inject(Container) private readonly _container: Container) {}

  onInitialize() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    Array.from(this._pluginData.values()).forEach((binder) =>
      binder.onPluginInitialize(),
    );
  }

  registerPlugin(plugin: WutWotPlugin): void {
    const id = plugin.id;

    if (this._pluginData.has(id)) {
      throw new DuplicateIDError(
        `A plugin with id "${id}" already exists.  Please reconfigure the plugin to use a different ID.`,
      );
    }

    const binder = this._container.get(PluginBinder, {
      [PluginBinderParameters.Plugin]: plugin,
    });
    this._pluginData.set(id, binder);

    if (this._initialized && plugin.onPluginInitialize) {
      binder.onPluginInitialize();
    }
  }
}
