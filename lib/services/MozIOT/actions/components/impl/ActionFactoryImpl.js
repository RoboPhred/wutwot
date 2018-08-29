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
const v4_1 = __importDefault(require("uuid/v4"));
const ActionFactory_1 = require("../ActionFactory");
const ThingActionImpl_1 = require("./ThingActionImpl");
const microinject_1 = require("microinject");
let ActionFactoryImpl = class ActionFactoryImpl {
    createAction(action, thingId, owner) {
        return new ThingActionImpl_1.ThingActionImpl(action, v4_1.default(), thingId, owner);
    }
};
ActionFactoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionFactory_1.ActionFactory)
], ActionFactoryImpl);
exports.ActionFactoryImpl = ActionFactoryImpl;
//# sourceMappingURL=ActionFactoryImpl.js.map