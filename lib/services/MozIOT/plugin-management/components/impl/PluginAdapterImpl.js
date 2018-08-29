"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginAdapterImpl {
    constructor(_plugin, _thingFactory, _thingRepository, 
    // TODO: Too much responsibility; need to abstract
    //  sequence of factory.create() + repository.add().
    _actionFactory, _actionRepository) {
        this._plugin = _plugin;
        this._thingFactory = _thingFactory;
        this._thingRepository = _thingRepository;
        this._actionFactory = _actionFactory;
        this._actionRepository = _actionRepository;
        const pluginContext = {
            addThing: this._addThing.bind(this),
            removeThing: this._removeThing.bind(this),
            getThings: this._getThings.bind(this),
            getOwnThings: this._getOwnThings.bind(this),
            addCapability: this._addCapability.bind(this)
        };
        _plugin.onRegisterPlugin(pluginContext);
    }
    _addThing(def, ...capabilities) {
        const thing = this._thingFactory.createThing(def, this._plugin);
        this._thingRepository.addThing(thing);
        this._addCapability(thing.id, ...capabilities);
        return thing;
    }
    _removeThing(thingId) {
        const thing = this._thingRepository.get(thingId);
        if (!thing) {
            throw new Error("No thing exists by the provided thingId.");
        }
        if (thing.ownerPlugin !== this._plugin) {
            throw new Error("The plugin does not own the requested thing.");
        }
        this._thingRepository.removeThing(thingId);
    }
    _getThings() {
        return Array.from(this._thingRepository);
    }
    _getOwnThings() {
        return Array.from(this._thingRepository).filter(x => x.ownerPlugin === this._plugin);
    }
    _addCapability(thingId, ...capabilities) {
        const flatCaps = [].concat(...capabilities);
        for (const cap of flatCaps) {
            switch (cap.capabilityType) {
                case "action":
                    {
                        const action = this._actionFactory.createAction(cap, thingId, this._plugin);
                        this._actionRepository.addAction(thingId, action);
                    }
                    break;
                default:
                    throw new Error(`Capability "${cap.capabilityType}" not implemented.`);
            }
        }
    }
}
exports.PluginAdapterImpl = PluginAdapterImpl;
//# sourceMappingURL=PluginAdapterImpl.js.map