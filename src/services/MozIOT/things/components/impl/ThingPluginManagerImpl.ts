import { injectable, provides, inject, singleton } from "microinject";

import { IDMapper } from "../../../utils/IDMapper";

import {
  ThingProviderPlugin,
  ThingProviderPluginAdapter,
  ThingDef,
  ThingContext
} from "../../contracts";

import { ThingPluginManager } from "../ThingPluginManager";
import { ThingRepository } from "../ThingRepository";

@injectable()
@singleton()
@provides(ThingPluginManager)
export class ThingPluginManagerImpl {
  private readonly _providers = new Map<
    ThingProviderPlugin,
    ThingProviderPluginAdapter
  >();

  private readonly _ids = new IDMapper();

  constructor(
    @inject(ThingProviderPlugin, { all: true })
    thingProviders: ThingProviderPlugin[],
    @inject(ThingRepository) repository: ThingRepository
  ) {
    for (const provider of thingProviders) {
      const adapter = new ThingProviderPluginAdapterImpl(
        provider,
        this._ids,
        repository
      );
      this._providers.set(provider, adapter);
      provider.onRegisterThingProvider(adapter);
    }
  }
}

// TODO: Move to class and make with factory.
class ThingProviderPluginAdapterImpl implements ThingProviderPluginAdapter {
  private readonly _localIdsToIds = new Map<string, string>();

  constructor(
    private _plugin: ThingProviderPlugin,
    private _idMap: IDMapper,
    private _thingRepository: ThingRepository
  ) {}

  addThing(def: ThingDef): ThingContext {
    const thingId = this._idMap.createId(def.thingId);
    const ctx: ThingContext = {
      ...def,
      thingId,
      thingProviderId: this._plugin.id,
      thingProviderThingId: def.thingId
    };
    Object.freeze(ctx);
    this._localIdsToIds.set(def.thingId, thingId);
    this._thingRepository.addThing(ctx);
    return ctx;
  }

  removeThing(thingId: string): void {
    const outerId = this._localIdsToIds.get(thingId);
    if (!outerId) {
      throw new Error("The plugin does not own the requested thing id.");
    }

    this._idMap.retireId(outerId);
    this._thingRepository.removeThing(outerId);
  }
}
