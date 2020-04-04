import { Container } from "microinject";

import containerModule from "./module";

import { Thing, ThingsManager } from "./components/things";
import { PluginManager, MozIotPlugin } from "./components/plugin-management";
import { Initializable } from "./contracts";

export class MozIot {
  private _container: Container = new Container();
  private _pluginManager: PluginManager;
  private _thingManager: ThingsManager;

  constructor(plugins: MozIotPlugin[]) {
    this._container.bind(Container).toConstantValue(this._container);
    this._container.load(containerModule);

    this._pluginManager = this._container.get(PluginManager);
    this._thingManager = this._container.get(ThingsManager);

    for (const plugin of plugins) {
      this._pluginManager.registerPlugin(plugin);
    }

    this._container
      .getAll(Initializable)
      .forEach(initializable => initializable.initialize());
  }

  // TODO: Should be live instance Record<thingId, Thing>
  get things(): ReadonlyArray<Thing> {
    return this._thingManager.getThings().map(thing => thing.publicProxy);
  }
}
