"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingImpl {
    constructor(_def, _id, _ownerId) {
        this._def = _def;
        this._id = _id;
        this._ownerId = _ownerId;
        this._def = Object.assign({}, _def);
        this._metadata = Object.assign({}, _def.metadata);
    }
    get id() {
        return this._id;
    }
    get ownerPluginId() {
        return this._ownerId;
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
        // TODO: actions from capabilities
        return {};
    }
}
exports.ThingImpl = ThingImpl;
//# sourceMappingURL=ThingImpl.js.map