import {
  inject,
  injectable,
  injectScope,
  provides,
  singleton,
} from "microinject";

import { ThingDef, ThingsManager } from "../../things";

import { PluginThingFactory } from "../components";
import { WutWotPlugin } from "../contracts";
import { inPluginScope, PluginScope } from "../scopes";
import { PluginThingsManager } from "../services";
import { OwnedPluginThing, PluginThing } from "../types";

@injectable()
@singleton()
@provides(PluginThingsManager)
@inPluginScope()
export class PluginThingsManagerImpl implements PluginThingsManager {
  constructor(
    @inject(ThingsManager) private readonly _thingManager: ThingsManager,
    @inject(PluginThingFactory)
    private readonly _pluginThingFactory: PluginThingFactory,
  ) {}

  @injectScope(PluginScope)
  private _plugin!: WutWotPlugin;

  addThing(def: ThingDef): OwnedPluginThing {
    const thing = this._thingManager.createThing(def, this._plugin);
    const pluginThing = this._pluginThingFactory.getPluginThing(
      thing,
      this._plugin,
    );
    return pluginThing as OwnedPluginThing;
  }

  getThing(id: string): PluginThing | null {
    const thing = this._thingManager.get(id);
    if (!thing) {
      return null;
    }
    const pluginThing = this._pluginThingFactory.getPluginThing(
      thing,
      this._plugin,
    );
    return pluginThing;
  }

  getThings(): PluginThing[] {
    return Array.from(this._thingManager.values()).map((thing) =>
      this._pluginThingFactory.getPluginThing(thing, this._plugin),
    );
  }

  getOwnThings(): OwnedPluginThing[] {
    return Array.from(this._thingManager.values())
      .filter((x) => x.ownerPlugin === this._plugin)
      .map(
        (thing) =>
          this._pluginThingFactory.getPluginThing(
            thing,
            this._plugin,
          ) as OwnedPluginThing,
      );
  }
}
