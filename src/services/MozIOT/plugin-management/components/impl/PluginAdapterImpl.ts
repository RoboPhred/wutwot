import { MaybeArray } from "../../../../../types";

import {
  MozIotPlugin,
  MozIotPluginContext,
  ThingCapabilityDef
} from "../../contracts";

import { Thing, ThingDef } from "../../../things";
import { ThingRepository } from "../../../things/components/ThingRepository";
import { ThingFactory } from "../../../things/components/ThingFactory";

export class PluginAdapterImpl {
  constructor(
    private _plugin: MozIotPlugin,
    private _thingFactory: ThingFactory,
    private _thingRepository: ThingRepository
  ) {
    const pluginContext: MozIotPluginContext = {
      addThing: this._addThing.bind(this),

      removeThing: this._removeThing.bind(this),

      getThings: this._getThings.bind(this),

      getOwnThings: this._getOwnThings.bind(this),

      addCapability: this._addCapability.bind(this)
    };

    _plugin.onRegisterPlugin(pluginContext);
  }

  private _addThing(
    def: ThingDef,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): Thing {
    const thing = this._thingFactory.createThing(def, this._plugin);
    this._thingRepository.addThing(thing);

    this._addCapability(thing.id, ...capabilities);
    return thing;
  }

  private _removeThing(thingId: string): void {
    const thing = this._thingRepository.get(thingId);
    if (!thing) {
      throw new Error("No thing exists by the provided thingId.");
    }

    if (thing.ownerPlugin !== this._plugin) {
      throw new Error("The plugin does not own the requested thing.");
    }

    this._thingRepository.removeThing(thingId);
  }

  private _getThings(): Thing[] {
    return Array.from(this._thingRepository);
  }

  private _getOwnThings(): Thing[] {
    return Array.from(this._thingRepository).filter(
      x => x.ownerPlugin === this._plugin
    );
  }

  private _addCapability(
    thingId: string,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): void {
    const flatCaps = ([] as ThingCapabilityDef[]).concat(...capabilities);
    throw new Error("Method not implemented.");
  }
}
