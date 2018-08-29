"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingActionImpl {
    constructor(_def, _id, _thingId, _owner) {
        this._def = _def;
        this._id = _id;
        this._thingId = _thingId;
        this._owner = _owner;
    }
    get id() {
        return this._id;
    }
    get thingId() {
        return this._thingId;
    }
    get ownerPlugin() {
        return this._owner;
    }
    get label() {
        return this._def.label;
    }
    get description() {
        return this._def.description;
    }
    get input() {
        return this._def.input;
    }
    request(input) {
        this._def.request(input);
    }
}
exports.ThingActionImpl = ThingActionImpl;
//# sourceMappingURL=ThingActionImpl.js.map