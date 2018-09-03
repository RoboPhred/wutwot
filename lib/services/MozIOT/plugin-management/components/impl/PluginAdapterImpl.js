"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginAdapterImpl {
    constructor(_plugin, _thingService, _thingTypesService, _actionService, _actionRequestService) {
        this._plugin = _plugin;
        this._thingService = _thingService;
        this._thingTypesService = _thingTypesService;
        this._actionService = _actionService;
        this._actionRequestService = _actionRequestService;
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
                case "type":
                    this._thingTypesService.addType(thingId, cap.type);
                    break;
                case "action":
                    this._actionService.addAction(thingId, cap, this._plugin);
                    break;
                default:
                    throwUnknownCapability(cap);
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
        const token = this._actionRequestService.addRequest(thingId, actionId, input, timeRequested);
        return token;
    }
}
exports.PluginAdapterImpl = PluginAdapterImpl;
function throwUnknownCapability(def) {
    const type = def.capabilityType;
    throw new Error(`Unknown capability type "${type}".`);
}
//# sourceMappingURL=PluginAdapterImpl.js.map