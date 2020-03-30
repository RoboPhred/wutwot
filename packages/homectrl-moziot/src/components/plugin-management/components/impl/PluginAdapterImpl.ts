import { ThingService, ThingDef } from "../../../things";

import {
  MozIotPlugin,
  MozIotPluginContext,
  OwnedPluginThing,
  PluginThing
} from "../../types";

import { PluginThingFactory } from "../PluginThingFactory";

export class PluginAdapterImpl {
  constructor(
    private _plugin: MozIotPlugin,
    private _thingService: ThingService,
    private _pluginThingFactory: PluginThingFactory
  ) {
    const pluginContext: MozIotPluginContext = {
      addThing: this._addThing.bind(this),
      getThing: this._getThing.bind(this),
      getThings: this._getThings.bind(this),
      getOwnThings: this._getOwnThings.bind(this)
    };

    _plugin.onRegisterPlugin(pluginContext);
  }

  get plugin() {
    return this._plugin;
  }

  private _addThing(def: ThingDef): OwnedPluginThing {
    const thing = this._thingService.addThing(def, this._plugin);
    const pluginThing = this._pluginThingFactory.getPluginThing(thing, this);
    return pluginThing as OwnedPluginThing;
  }

  private _getThing(id: string): PluginThing | null {
    const thing = this._thingService.getThing(id);
    if (!thing) {
      return null;
    }
    const pluginThing = this._pluginThingFactory.getPluginThing(thing, this);
    return pluginThing;
  }

  private _getThings(): PluginThing[] {
    return this._thingService
      .getThings()
      .map(thing => this._pluginThingFactory.getPluginThing(thing, this));
  }

  private _getOwnThings(): OwnedPluginThing[] {
    return this._thingService
      .getThings()
      .filter(x => x.ownerPlugin === this._plugin)
      .map(
        thing =>
          this._pluginThingFactory.getPluginThing(
            thing,
            this
          ) as OwnedPluginThing
      );
  }
}
