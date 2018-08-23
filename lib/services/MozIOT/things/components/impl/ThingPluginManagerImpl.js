"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const IDMapper_1 = require("../../../utils/IDMapper");
const contracts_1 = require("../../contracts");
const ThingPluginManager_1 = require("../ThingPluginManager");
const ThingRepository_1 = require("../ThingRepository");
let ThingPluginManagerImpl = class ThingPluginManagerImpl {
    constructor(thingProviders, repository) {
        this._providers = new Map();
        this._ids = new IDMapper_1.IDMapper();
        for (const provider of thingProviders) {
            const adapter = new ThingProviderPluginAdapterImpl(provider, this._ids, repository);
            this._providers.set(provider, adapter);
            provider.onRegisterThingProvider(adapter);
        }
    }
};
ThingPluginManagerImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ThingPluginManager_1.ThingPluginManager),
    __param(0, microinject_1.inject(contracts_1.ThingProviderPlugin, { all: true })),
    __param(1, microinject_1.inject(ThingRepository_1.ThingRepository))
], ThingPluginManagerImpl);
exports.ThingPluginManagerImpl = ThingPluginManagerImpl;
// TODO: Move to class and make with factory.
class ThingProviderPluginAdapterImpl {
    constructor(_plugin, _idMap, _thingRepository) {
        this._plugin = _plugin;
        this._idMap = _idMap;
        this._thingRepository = _thingRepository;
        this._localIdsToIds = new Map();
    }
    addThing(def) {
        const thingId = this._idMap.createId(def.thingId);
        const ctx = Object.assign({}, def, { thingId, thingProviderId: this._plugin.id, thingProviderThingId: def.thingId });
        Object.freeze(ctx);
        this._localIdsToIds.set(def.thingId, thingId);
        this._thingRepository.addThing(ctx);
        return ctx;
    }
    removeThing(thingId) {
        const outerId = this._localIdsToIds.get(thingId);
        if (!outerId) {
            throw new Error("The plugin does not own the requested thing id.");
        }
        this._idMap.retireId(outerId);
        this._thingRepository.removeThing(outerId);
    }
}
//# sourceMappingURL=ThingPluginManagerImpl.js.map