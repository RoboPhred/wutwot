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
const ThingFactory_1 = require("../ThingFactory");
const ThingImpl_1 = require("./ThingImpl");
let ThingFactoryImpl = class ThingFactoryImpl {
    createThing(def, ownerId) {
        return new ThingImpl_1.ThingImpl(def, v4_1.default(), ownerId);
    }
};
ThingFactoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ThingFactory_1.ThingFactory)
], ThingFactoryImpl);
exports.ThingFactoryImpl = ThingFactoryImpl;
//# sourceMappingURL=ThingFactoryImpl.js.map