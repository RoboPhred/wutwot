import { join as joinPath } from "path";
import { WutWotPlugin } from "@wutwot/core";
import { inject, injectable, provides, singleton } from "microinject";

import { WutWotPluginConfig } from "../../../config";

import { WutWotPluginEnumerator } from "../identifiers";

interface WutwotPluginConstructable {
  new (args: Record<string, any>): WutWotPlugin;
}

@injectable()
@singleton()
@provides(WutWotPluginEnumerator)
export class WutWotPluginEnumeratorImpl implements WutWotPluginEnumerator {
  private _plugins: WutWotPlugin[] | null = null;

  constructor(@inject(WutWotPluginConfig) private _pluginConfig: string) {}

  get plugins(): WutWotPlugin[] {
    if (!this._plugins) {
      this._plugins = this._getPlugins();
    }

    return this._plugins;
  }

  private _getPlugins(): WutWotPlugin[] {
    const pluginStrings = this._getPluginStrings(this._pluginConfig);
    const plugins = pluginStrings.map((pluginString) =>
      this._resolvePlugin(pluginString),
    );
    return plugins;
  }

  private _getPluginStrings(config: string): string[] {
    return config.split(";");
  }

  private _resolvePlugin(pluginString: string): WutWotPlugin {
    const parts = pluginString.split(":");
    const pluginConstructor = this._requirePlugin(parts[0]);
    // TODO: More advanced splitting so we can quote values that contain &
    let options: Record<string, any> = {};
    if (parts[1]) {
      parts[1].split("&").forEach((optionStr) => {
        const parts = optionStr.split("=");
        options[parts[0]] = parts[1] ?? true;
      });
    }
    return new pluginConstructor(options);
  }

  private _requirePlugin(pluginName: string): WutwotPluginConstructable {
    try {
      return require(joinPath(process.cwd(), "plugins", pluginName)).default;
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") {
        throw e;
      }
    }
    const exports = require(pluginName);

    return exports.default;
  }
}
