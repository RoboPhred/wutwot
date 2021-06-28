import { Container } from "microinject";
import { inspect } from "util";

import containerModule from "./module";

import { makeInspectJson } from "./utils/inspect";
import { isNotNull } from "./utils/types";
import { mapToObject } from "./utils/map";

import { Thing, ThingsManager } from "./components/things";
import { PluginManager, WutWotPlugin } from "./components/plugin-management";

import { Initializable, Shutdownable } from "./contracts";
import { createReadonlyMapWrapper } from "./immutable";

export class WutWot {
  private _container: Container = new Container();
  private _pluginManager: PluginManager;
  private _thingManager: ThingsManager;
  private _publicThingsMap: ReadonlyMap<string, Thing>;

  constructor(plugins: WutWotPlugin[]) {
    this._container.bind(Container).toConstantValue(this._container);
    this._container.bind(WutWot).toConstantValue(this);
    this._container.load(containerModule);

    this._pluginManager = this._container.get(PluginManager);

    this._thingManager = this._container.get(ThingsManager);
    this._publicThingsMap = createReadonlyMapWrapper(
      this._thingManager,
      (internal) => internal.publicProxy,
      "ThingMap",
    );

    for (const plugin of plugins) {
      this._pluginManager.registerPlugin(plugin);
    }

    this._container
      .getAll(Initializable)
      .forEach((initializable) => initializable.onInitialize());
  }

  [inspect.custom] = makeInspectJson("WutWot");

  get things(): ReadonlyMap<string, Thing> {
    return this._publicThingsMap;
  }

  async shutdown(): Promise<void> {
    const shutdownables = this._container.getAll(Shutdownable);
    const awaits = shutdownables
      .map((shutdownable) => shutdownable.onShutdown())
      .filter(isNotNull);
    await Promise.all(awaits);
  }

  toJSON() {
    return {
      things: mapToObject(this._publicThingsMap),
    };
  }
}
