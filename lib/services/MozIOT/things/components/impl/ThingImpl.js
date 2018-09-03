"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingImpl {
    constructor(_def, _id, _owner, _actionRegistry) {
        this._def = _def;
        this._id = _id;
        this._owner = _owner;
        this._actionRegistry = _actionRegistry;
        this._def = Object.assign({}, _def);
        this._metadata = Object.assign({}, _def.metadata);
    }
    get id() {
        return this._id;
    }
    get ownerPlugin() {
        return this._owner;
    }
    get name() {
        return this._def.name;
    }
    get types() {
        // TODO: Types from capabilities.
        return [];
    }
    get description() {
        return this._def.description;
    }
    get metadata() {
        return this._metadata;
    }
    get actions() {
        const actions = {};
        this._actionRegistry.getForThing(this._id).forEach(action => {
            actions[action.id] = action;
        });
        return Object.seal(actions);
    }
}
exports.ThingImpl = ThingImpl;
//# sourceMappingURL=ThingImpl.js.map