"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ActionService_1 = require("../ActionService");
const components_1 = require("../../components");
let ActionServiceImpl = class ActionServiceImpl {
    constructor(_factory, _repository) {
        this._factory = _factory;
        this._repository = _repository;
    }
    getAction(thingId, actionId) {
        return this._repository.get(thingId, actionId);
    }
    getForThing(thingId) {
        return this._repository.getForThing(thingId);
    }
    addAction(thingId, def, owner) {
        const action = this._factory.createAction(def, thingId, owner);
        this._repository.addAction(thingId, action);
        return action;
    }
};
ActionServiceImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionService_1.ActionService),
    __param(0, microinject_1.inject(components_1.ActionFactory)),
    __param(1, microinject_1.inject(components_1.ActionRepository))
], ActionServiceImpl);
exports.ActionServiceImpl = ActionServiceImpl;
//# sourceMappingURL=ActionServiceImpl.js.map