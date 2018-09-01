"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const v4_1 = __importDefault(require("uuid/v4"));
const types_1 = require("../../types");
const ActionRequestFactory_1 = require("../ActionRequestFactory");
let ActionRequestFactoryImpl = class ActionRequestFactoryImpl {
    createActionRequest(thingId, actionId, input, timeRequested) {
        const token = new ThingActionRequestTokenImpl(v4_1.default(), thingId, actionId, input, timeRequested);
        const request = new ThingActionRequestImpl(token);
        return { token, request };
    }
};
ActionRequestFactoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionRequestFactory_1.ActionRequestFactory)
], ActionRequestFactoryImpl);
exports.ActionRequestFactoryImpl = ActionRequestFactoryImpl;
class ThingActionRequestTokenImpl {
    constructor(_requestId, _thingId, _actionId, _input, _timeRequested) {
        this._requestId = _requestId;
        this._thingId = _thingId;
        this._actionId = _actionId;
        this._input = _input;
        this._timeRequested = _timeRequested;
        this._status = types_1.ThingActionRequestStatus.Pending;
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
        if (!types_1.ThingActionRequestStatus.canTransition(this._status, status)) {
            throw new Error(`Cannot transition from "${this._status}" to "${status}".`);
        }
        this._status = status;
        if (types_1.ThingActionRequestStatus.isFinalStatus(status)) {
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