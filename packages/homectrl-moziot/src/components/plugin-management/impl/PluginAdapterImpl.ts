import { Container } from "microinject";

import { ThingsManager, ThingDef } from "../../things";

import {
  MozIotPlugin,
  OwnedPluginThing,
  PluginThing,
  PluginAdapter
} from "../types";
import { PluginThingsManager } from "../services";

import { PluginThingFactory } from "../components/PluginThingFactory";

export class PluginAdapterImpl implements PluginAdapter {
  private _initialized = false;
  private _privateContainer: Container;

  constructor(
    private _plugin: MozIotPlugin,
    publicContainer: Container,
    private _thingManager: ThingsManager,
    private _pluginThingFactory: PluginThingFactory
  ) {
    this._privateContainer = new Container();
    this._privateContainer.parent = publicContainer;

    const pluginThingManager: PluginThingsManager = {
      addThing: this._addThing.bind(this),
      getThing: this._getThing.bind(this),
      getThings: this._getThings.bind(this),
      getOwnThings: this._getOwnThings.bind(this)
    };
    this._privateContainer
      .bind(PluginThingsManager)
      .toConstantValue(pluginThingManager);

    if (_plugin.onRegisterPublicServices) {
      const registryModule = _plugin.onRegisterPublicServices(
        publicContainer.bind.bind(publicContainer)
      );
      if (registryModule) {
        publicContainer.load(registryModule);
      }
    }

    if (_plugin.onRegisterPrivateServices) {
      const registryModule = _plugin.onRegisterPrivateServices(
        this._privateContainer.bind.bind(this._privateContainer)
      );
      if (registryModule) {
        this._privateContainer.load(registryModule);
      }
    }
  }

  get plugin() {
    return this._plugin;
  }

  initialize() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    this._plugin.onPluginInitialize(this._privateContainer);
  }

  private _addThing(def: ThingDef): OwnedPluginThing {
    const thing = this._thingManager.addThing(def, this._plugin);
    const pluginThing = this._pluginThingFactory.getPluginThing(thing, this);
    return pluginThing as OwnedPluginThing;
  }

  private _getThing(id: string): PluginThing | null {
    const thing = this._thingManager.getThing(id);
    if (!thing) {
      return null;
    }
    const pluginThing = this._pluginThingFactory.getPluginThing(thing, this);
    return pluginThing;
  }

  private _getThings(): PluginThing[] {
    return this._thingManager
      .getThings()
      .map(thing => this._pluginThingFactory.getPluginThing(thing, this));
  }

  private _getOwnThings(): OwnedPluginThing[] {
    return this._thingManager
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
