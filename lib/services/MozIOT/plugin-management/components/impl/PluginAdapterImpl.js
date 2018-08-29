"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginAdapterImpl {
    constructor(plugin, _thingFactory, _thingRepository) {
        this._thingFactory = _thingFactory;
        this._thingRepository = _thingRepository;
        this._pluginId = plugin.id;
        const pluginContext = {
            addThing: this._addThing.bind(this),
            removeThing: this._removeThing.bind(this),
            getThings: this._getThings.bind(this),
            getOwnThings: this._getOwnThings.bind(this),
            addCapability(thingId, ...capabilities) {
                throw new Error("Method not implemented.");
            }
        };
        plugin.onRegisterPlugin(pluginContext);
    }
    _addThing(def, ...capabilities) {
        const thing = this._thingFactory.createThing(def, this._pluginId);
        this._thingRepository.addThing(thing);
        return thing;
    }
    _removeThing(thingId) {
        const thing = this._thingRepository.get(thingId);
        if (!thing) {
            throw new Error("No thing exists by the provided thingId.");
        }
        if (thing.ownerPluginId !== this._pluginId) {
            throw new Error("The plugin does not own the requested thing.");
        }
        this._thingRepository.removeThing(thingId);
    }
    _getThings() {
        return Array.from(this._thingRepository);
    }
    _getOwnThings() {
        return Array.from(this._thingRepository).filter(x => x.ownerPluginId === this._pluginId);
    }
}
exports.PluginAdapterImpl = PluginAdapterImpl;
//# sourceMappingURL=PluginAdapterImpl.js.map