import { Container } from "microinject";

import { ThingsManager, ThingDef, ThingEventSource } from "../../things";
import { Database } from "../../persistence";

import { WutWotPlugin, OwnedPluginThing, PluginThing } from "../types";
import { PluginThingsManager } from "../services";
import { PluginAdapter, PluginThingFactory } from "../components";

import { PluginDataPersistenceImpl } from "./PluginDataPersistenceImpl";

export class PluginAdapterImpl implements PluginAdapter {
  private _initialized = false;
  private _postInitialized = false;

  constructor(
    private _plugin: WutWotPlugin,
    private _publicContainer: Container,
    private _thingManager: ThingsManager,
    private _pluginThingFactory: PluginThingFactory,
  ) {
    const pluginThingsManager: PluginThingsManager = {
      addThing: this._addThing.bind(this),
      getThing: this._getThing.bind(this),
      getThings: this._getThings.bind(this),
      getOwnThings: this._getOwnThings.bind(this),
    };
    const dataPersistence = new PluginDataPersistenceImpl(
      _plugin.id,
      _publicContainer.get(Database),
    );

    if (_plugin.onRegisterServices) {
      const registryModule = _plugin.onRegisterServices(
        _publicContainer.bind.bind(_publicContainer),
        {
          thingsManager: pluginThingsManager,
          dataPersistence,
        },
      );
      if (registryModule) {
        _publicContainer.load(registryModule);
      }
    }
  }

  get pluginId() {
    return this._plugin.id;
  }

  get plugin() {
    return this._plugin;
  }

  initialize() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    if (this._plugin.onPluginInitialize) {
      this._plugin.onPluginInitialize(this._publicContainer);
    }
  }

  postInitialize() {
    if (!this._initialized || this._postInitialized) {
      return;
    }
    this._postInitialized = true;
    if (this._plugin.onPluginPostInitialize) {
      this._plugin.onPluginPostInitialize(this._publicContainer);
    }
  }

  private _addThing(def: ThingDef): OwnedPluginThing {
    const thing = this._thingManager.createThing(def, this._plugin);
    const pluginThing = this._pluginThingFactory.getPluginThing(thing, this);
    return pluginThing as OwnedPluginThing;
  }

  private _getThing(id: string): PluginThing | null {
    const thing = this._thingManager.get(id);
    if (!thing) {
      return null;
    }
    const pluginThing = this._pluginThingFactory.getPluginThing(thing, this);
    return pluginThing;
  }

  private _getThings(): PluginThing[] {
    return Array.from(this._thingManager.values()).map((thing) =>
      this._pluginThingFactory.getPluginThing(thing, this),
    );
  }

  private _getOwnThings(): OwnedPluginThing[] {
    return Array.from(this._thingManager.values())
      .filter((x) => x.ownerPlugin === this._plugin)
      .map(
        (thing) =>
          this._pluginThingFactory.getPluginThing(
            thing,
            this,
          ) as OwnedPluginThing,
      );
  }
}
