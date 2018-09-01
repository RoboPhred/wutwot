"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginAdapterImpl {
    constructor(_plugin, _thingFactory, _thingRepository, _actionFactory, _actionRepository, _actionRequestFactory, _actionRequestRepository) {
        this._plugin = _plugin;
        this._thingFactory = _thingFactory;
        this._thingRepository = _thingRepository;
        this._actionFactory = _actionFactory;
        this._actionRepository = _actionRepository;
        this._actionRequestFactory = _actionRequestFactory;
        this._actionRequestRepository = _actionRequestRepository;
        const pluginContext = {
            addThing: this._addThing.bind(this),
            removeThing: this._removeThing.bind(this),
            getThings: this._getThings.bind(this),
            getOwnThings: this._getOwnThings.bind(this),
            addCapability: this._addCapability.bind(this),
            addActionRequest: this._addActionRequest.bind(this)
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
    _addActionRequest(thingId, actionId, input, timeRequested) {
        const action = this._actionRepository.get(thingId, actionId);
        if (!action) {
            throw new Error("No action exists on the given thing with the given id.");
        }
        if (action.ownerPlugin !== this._plugin) {
            throw new Error("The plugin does not own the requested action.");
        }
        const { request, token } = this._actionRequestFactory.createActionRequest(thingId, actionId, input, timeRequested);
        this._actionRequestRepository.addRequest(request);
        return token;
    }
}
exports.PluginAdapterImpl = PluginAdapterImpl;
//# sourceMappingURL=PluginAdapterImpl.js.map