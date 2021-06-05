import { Container } from "microinject";

import { ThingsManager, ThingDef } from "../../things";
import { Database } from "../../persistence";

import {
  WutWotPlugin,
  OwnedPluginThing,
  PluginThing,
  PluginAdapter,
} from "../types";
import { PluginThingsManager, PluginDataPersistence } from "../services";

import { PluginThingFactory } from "../components";

import { PluginDataPersistenceImpl } from "./PluginDataPersistenceImpl";
import { Initializable } from "../../../contracts";

export class PluginAdapterImpl implements PluginAdapter {
  private _initialized = false;
  private _privateContainer: Container;

  constructor(
    private _plugin: WutWotPlugin,
    publicContainer: Container,
    private _thingManager: ThingsManager,
    private _pluginThingFactory: PluginThingFactory,
  ) {
    this._privateContainer = new Container();
    this._privateContainer.parent = publicContainer;

    const pluginThingManager: PluginThingsManager = {
      addThing: this._addThing.bind(this),
      getThing: this._getThing.bind(this),
      getThings: this._getThings.bind(this),
      getOwnThings: this._getOwnThings.bind(this),
    };
    this._privateContainer
      .bind(PluginThingsManager)
      .toConstantValue(pluginThingManager);

    this._privateContainer
      .bind(PluginDataPersistence)
      .toConstantValue(
        new PluginDataPersistenceImpl(
          _plugin.id,
          publicContainer.get(Database),
        ),
      );

    if (_plugin.onRegisterPublicServices) {
      const registryModule = _plugin.onRegisterPublicServices(
        publicContainer.bind.bind(publicContainer),
      );
      if (registryModule) {
        publicContainer.load(registryModule);
      }
    }

    if (_plugin.onRegisterPrivateServices) {
      const registryModule = _plugin.onRegisterPrivateServices(
        this._privateContainer.bind.bind(this._privateContainer),
      );
      if (registryModule) {
        this._privateContainer.load(registryModule);
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

    this._privateContainer
      .getAll(Initializable)
      .forEach((x) => x.onInitialize());

    if (this._plugin.onPluginInitialize) {
      this._plugin.onPluginInitialize(this._privateContainer);
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
