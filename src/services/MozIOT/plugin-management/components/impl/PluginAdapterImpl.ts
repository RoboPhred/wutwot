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
  private readonly _pluginId: string;

  constructor(
    plugin: MozIotPlugin,
    private _thingFactory: ThingFactory,
    private _thingRepository: ThingRepository
  ) {
    this._pluginId = plugin.id;

    const pluginContext: MozIotPluginContext = {
      addThing: this._addThing.bind(this),

      removeThing: this._removeThing.bind(this),

      getThings: this._getThings.bind(this),

      getOwnThings: this._getOwnThings.bind(this),

      addCapability(
        thingId: string,
        ...capabilities: MaybeArray<ThingCapabilityDef>[]
      ): void {
        throw new Error("Method not implemented.");
      }
    };

    plugin.onRegisterPlugin(pluginContext);
  }

  private _addThing(
    def: ThingDef,
    ...capabilities: MaybeArray<ThingCapabilityDef>[]
  ): Thing {
    const thing = this._thingFactory.createThing(def, this._pluginId);
    this._thingRepository.addThing(thing);
    return thing;
  }

  private _removeThing(thingId: string): void {
    const thing = this._thingRepository.get(thingId);
    if (!thing) {
      throw new Error("No thing exists by the provided thingId.");
    }

    if (thing.ownerPluginId !== this._pluginId) {
      throw new Error("The plugin does not own the requested thing.");
    }

    this._thingRepository.removeThing(thingId);
  }

  private _getThings(): Thing[] {
    return Array.from(this._thingRepository);
  }

  private _getOwnThings(): Thing[] {
    return Array.from(this._thingRepository).filter(
      x => x.ownerPluginId === this._pluginId
    );
  }
}
