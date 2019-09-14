import { injectable, singleton, inject } from "microinject";

import { Thing, ThingService } from "./components/things";
import { PluginManager } from "./components/plugin-management/components/PluginManager";
import { MozIotPlugin } from "./components/plugin-management";

@injectable()
@singleton()
export class MozIot {
  constructor(
    @inject(ThingService) private _thingsService: ThingService,
    @inject(PluginManager) pluginManager: PluginManager,
    @inject(MozIotPlugin, { all: true }) plugins: MozIotPlugin[]
  ) {
    for (const plugin of plugins) {
      pluginManager.registerPlugin(plugin);
    }
  }

  get things(): ReadonlyArray<Thing> {
    return this._thingsService.getThings();
  }
}
