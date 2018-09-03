"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginAdapterImpl {
    constructor(_plugin, _thingService, _actionService, _actionRequestFactory, _actionRequestRepository) {
        this._plugin = _plugin;
        this._thingService = _thingService;
        this._actionService = _actionService;
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
        const thing = this._thingService.addThing(def, this._plugin);
        this._addCapability(thing.id, ...capabilities);
        return thing;
    }
    _removeThing(thingId) {
        const thing = this._thingService.getThing(thingId);
        if (!thing) {
            throw new Error("No thing exists by the provided thingId.");
        }
        if (thing.ownerPlugin !== this._plugin) {
            throw new Error("The plugin does not own the specified thing.");
        }
        this._thingService.removeThing(thingId);
    }
    _getThings() {
        return this._thingService.getThings();
    }
    _getOwnThings() {
        return this._thingService
            .getThings()
            .filter(x => x.ownerPlugin === this._plugin);
    }
    _addCapability(thingId, ...capabilities) {
        const flatCaps = [].concat(...capabilities);
        for (const cap of flatCaps) {
            switch (cap.capabilityType) {
                case "action":
                    this._actionService.addAction(thingId, cap, this._plugin);
                    break;
                default:
                    throw new Error(`Capability "${cap.capabilityType}" not implemented.`);
            }
        }
    }
    _addActionRequest(thingId, actionId, input, timeRequested) {
        const action = this._actionService.getAction(thingId, actionId);
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