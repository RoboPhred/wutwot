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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const v4_1 = __importDefault(require("uuid/v4"));
const ActionRequestFactory_1 = require("../../../action-requests/components/ActionRequestFactory");
const ActionRequestRepository_1 = require("../../../action-requests/components/ActionRequestRepository");
const ActionFactory_1 = require("../ActionFactory");
const ThingActionImpl_1 = require("./ThingActionImpl");
let ActionFactoryImpl = class ActionFactoryImpl {
    constructor(_actionRequestFactory, _actionRequestRepository) {
        this._actionRequestFactory = _actionRequestFactory;
        this._actionRequestRepository = _actionRequestRepository;
    }
    createAction(action, thingId, owner) {
        return new ThingActionImpl_1.ThingActionImpl(action, v4_1.default(), thingId, owner, this._actionRequestFactory, this._actionRequestRepository);
    }
};
ActionFactoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionFactory_1.ActionFactory),
    __param(0, microinject_1.inject(ActionRequestFactory_1.ActionRequestFactory)),
    __param(1, microinject_1.inject(ActionRequestRepository_1.ActionRequestRepository))
], ActionFactoryImpl);
exports.ActionFactoryImpl = ActionFactoryImpl;
//# sourceMappingURL=ActionFactoryImpl.js.map