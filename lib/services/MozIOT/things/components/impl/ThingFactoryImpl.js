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
const ThingFactory_1 = require("../ThingFactory");
const ThingImpl_1 = require("./ThingImpl");
const components_1 = require("../../../actions/components");
let ThingFactoryImpl = class ThingFactoryImpl {
    constructor(_actionRegistry) {
        this._actionRegistry = _actionRegistry;
    }
    createThing(def, owner) {
        return new ThingImpl_1.ThingImpl(def, v4_1.default(), owner, this._actionRegistry);
    }
};
ThingFactoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ThingFactory_1.ThingFactory),
    __param(0, microinject_1.inject(components_1.ActionRegistry))
], ThingFactoryImpl);
exports.ThingFactoryImpl = ThingFactoryImpl;
//# sourceMappingURL=ThingFactoryImpl.js.map