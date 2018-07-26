"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingFactory_1 = require("../ThingFactory");
const ThingImpl_1 = require("./ThingImpl");
const ActionAggregator_1 = require("../../ActionAggregator/ActionAggregator");
let ThingFactoryImpl = class ThingFactoryImpl {
    createThing(def) { }
};
ThingFactoryImpl = __decorate([
    microinject_1.injectable(ThingFactory_1.ThingFactory)
], ThingFactoryImpl);
exports.ThingFactoryImpl = ThingFactoryImpl;
const thingFactoryFactory = (context) => {
    // Current feature set does not entirely play nice with
    //  dynamic factories and constructor params.
    // https://github.com/RoboPhred/node-microinject/issues/1
    return function thingFactory(def) {
        const container = new microinject_1.Container();
        const actionAggregator = container.get(ActionAggregator_1.ActionAggregator);
        return new ThingImpl_1.ThingImpl(def, actionAggregator);
    };
};
//# sourceMappingURL=ThingFactoryImpl.js.map