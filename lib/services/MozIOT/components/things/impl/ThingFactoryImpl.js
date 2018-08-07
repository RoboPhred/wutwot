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
const ActionAggregator_1 = require("../../actions/ActionAggregator");
const ThingFactory_1 = require("../ThingFactory");
const ThingImpl_1 = require("./ThingImpl");
let ThingFactoryImpl = class ThingFactoryImpl {
    constructor(_actionAggregator) {
        this._actionAggregator = _actionAggregator;
    }
    createThing(def) {
        return new ThingImpl_1.ThingImpl(def, this._actionAggregator);
    }
};
ThingFactoryImpl = __decorate([
    microinject_1.injectable(ThingFactory_1.ThingFactory),
    __param(0, microinject_1.inject(ActionAggregator_1.ActionAggregator))
], ThingFactoryImpl);
exports.ThingFactoryImpl = ThingFactoryImpl;
//# sourceMappingURL=ThingFactoryImpl.js.map