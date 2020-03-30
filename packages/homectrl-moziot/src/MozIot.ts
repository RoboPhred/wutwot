import { Container } from "microinject";

import containerModule from "./module";

import { Thing, ThingService } from "./components/things";
import { PluginManager, MozIotPlugin } from "./components/plugin-management";

export class MozIot {
  private _container: Container = new Container();
  private _pluginManager: PluginManager;
  private _thingService: ThingService;

  constructor(plugins: MozIotPlugin[]) {
    this._container.load(containerModule);
    this._pluginManager = this._container.get(PluginManager);
    this._thingService = this._container.get(ThingService);

    for (const plugin of plugins) {
      this._pluginManager.registerPlugin(plugin);
    }
  }

  get things(): ReadonlyArray<Thing> {
    return this._thingService.getThings();
  }
}
