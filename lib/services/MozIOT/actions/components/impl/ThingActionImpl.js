"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingActionImpl {
    constructor(_def, _id, _thingId, _owner, _actionRequestFactory, _actionRepository) {
        this._def = _def;
        this._id = _id;
        this._thingId = _thingId;
        this._owner = _owner;
        this._actionRequestFactory = _actionRequestFactory;
        this._actionRepository = _actionRepository;
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
    get requests() {
        return Object.seal(this._actionRepository.getForThingAction(this._thingId, this._id));
    }
    request(input) {
        const { request, token } = this._actionRequestFactory.createActionRequest(this._thingId, this._id, input, new Date().toISOString());
        this._def.request(input, token);
        return request;
    }
}
exports.ThingActionImpl = ThingActionImpl;
//# sourceMappingURL=ThingActionImpl.js.map