"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const ThingActionRequestStatus_1 = require("../../types/ThingActionRequestStatus");
class ActionRequestFactoryImpl {
    createActionRequest(thingId, actionId, input, timeRequested) {
        const token = new ThingActionRequestTokenImpl(v4_1.default(), thingId, actionId, input, timeRequested);
        const request = new ThingActionRequestImpl(token);
        return { token, request };
    }
}
exports.ActionRequestFactoryImpl = ActionRequestFactoryImpl;
class ThingActionRequestTokenImpl {
    constructor(_requestId, _thingId, _actionId, _input, _timeRequested) {
        this._requestId = _requestId;
        this._thingId = _thingId;
        this._actionId = _actionId;
        this._input = _input;
        this._timeRequested = _timeRequested;
        this._status = ThingActionRequestStatus_1.ThingActionRequestStatus.Pending;
        this._timeCompleted = null;
    }
    get id() {
        return this._requestId;
    }
    get thingId() {
        return this._thingId;
    }
    get actionId() {
        return this._actionId;
    }
    get input() {
        return this._input;
    }
    get timeRequested() {
        return this._timeRequested;
    }
    get timeCompleted() {
        return this._timeCompleted;
    }
    get status() {
        return this._status;
    }
    setStatus(status) {
        if (this._status === status) {
            return;
        }
        if (!ThingActionRequestStatus_1.ThingActionRequestStatus.canTransition(this._status, status)) {
            throw new Error(`Cannot transition from "${this._status}" to "${status}".`);
        }
        this._status = status;
        if (ThingActionRequestStatus_1.ThingActionRequestStatus.isFinalStatus(status)) {
            this._timeCompleted = new Date().toISOString();
        }
    }
}
class ThingActionRequestImpl {
    constructor(_token) {
        this._token = _token;
    }
    get id() {
        return this._token.id;
    }
    get thingId() {
        return this._token.thingId;
    }
    get actionId() {
        return this._token.actionId;
    }
    get input() {
        return this._token.input;
    }
    get timeRequested() {
        return this._token.timeRequested;
    }
    get timeCompleted() {
        return this._token.timeCompleted;
    }
    get status() {
        return this._token.status;
    }
}
//# sourceMappingURL=ActionRequestFactoryImpl.js.map