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
const components_1 = require("../../components");
const ThingService_1 = require("../ThingService");
let ThingServiceImpl = class ThingServiceImpl {
    constructor(_factory, _repository) {
        this._factory = _factory;
        this._repository = _repository;
    }
    addThing(def, owner) {
        const thing = this._factory.createThing(def, owner);
        this._repository.addThing(thing);
        return thing;
    }
    removeThing(thingId) {
        this._repository.removeThing(thingId);
    }
    getThing(thingId) {
        return this._repository.get(thingId);
    }
    getThings() {
        return Array.from(this._repository);
    }
};
ThingServiceImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ThingService_1.ThingService),
    __param(0, microinject_1.inject(components_1.ThingFactory)),
    __param(1, microinject_1.inject(components_1.ThingRepository))
], ThingServiceImpl);
exports.ThingServiceImpl = ThingServiceImpl;
//# sourceMappingURL=ThingServiceImpl.js.map