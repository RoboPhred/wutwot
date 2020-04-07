import { Container } from "microinject";
import { inspect } from "util";
import { mapValues } from "lodash";

import containerModule from "./module";

import { makeInspectJson } from "./utils/inspect";
import { isNotNull } from "./utils/types";

import { Thing, ThingsManager } from "./components/things";
import { PluginManager, MozIotPlugin } from "./components/plugin-management";

import { Initializable, Shutdownable } from "./contracts";
import { ReadonlyRecord } from "./types";

export class MozIot {
  private _container: Container = new Container();
  private _pluginManager: PluginManager;
  private _thingManager: ThingsManager;

  constructor(plugins: MozIotPlugin[]) {
    this._container.bind(Container).toConstantValue(this._container);
    this._container.bind(MozIot).toConstantValue(this);
    this._container.load(containerModule);

    this._pluginManager = this._container.get(PluginManager);
    this._thingManager = this._container.get(ThingsManager);

    for (const plugin of plugins) {
      this._pluginManager.registerPlugin(plugin);
    }

    this._container
      .getAll(Initializable)
      .forEach((initializable) => initializable.onInitialize());
  }

  [inspect.custom] = makeInspectJson("MozIot");

  get things(): ReadonlyRecord<string, Thing> {
    // TODO: Should be live instance Record<thingId, Thing>
    return mapValues(
      this._thingManager.objectAccessor,
      (thing) => thing.publicProxy,
    );
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
      things: mapValues(this.things, (thing) => thing.toJSON()),
    };
  }
}
