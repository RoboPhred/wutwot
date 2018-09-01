"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ActionRequestRepository_1 = require("../ActionRequestRepository");
const ActionRequestRegistry_1 = require("../ActionRequestRegistry");
const microinject_1 = require("microinject");
let ActionRequestRepositoryImpl = class ActionRequestRepositoryImpl extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._requests = new Map();
    }
    get(requestId) {
        return this._requests.get(requestId);
    }
    getForThingAction(thingId, actionId) {
        const values = [];
        for (const request of this._requests.values()) {
            if (request.thingId === thingId && request.actionId === actionId) {
                values.push(request);
            }
        }
        return values;
    }
    addRequest(request) {
        if (this._requests.has(request.id)) {
            throw new Error("Duplicate request id.");
        }
        this._requests.set(request.id, request);
        const e = {
            thingId: request.thingId,
            actionId: request.actionId,
            requestId: request.id,
            request
        };
        this.emit("request.add", e);
    }
};
ActionRequestRepositoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionRequestRegistry_1.ActionRequestRegistry),
    microinject_1.provides(ActionRequestRepository_1.ActionRequestRepository)
], ActionRequestRepositoryImpl);
exports.ActionRequestRepositoryImpl = ActionRequestRepositoryImpl;
//# sourceMappingURL=ActionRequestRepositoryImpl.js.map