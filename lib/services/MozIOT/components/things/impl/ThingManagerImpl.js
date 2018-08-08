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
const events_1 = require("events");
const microinject_1 = require("microinject");
const ThingFactory_1 = require("../ThingFactory");
const ThingManager_1 = require("../ThingManager");
const ThingAggregator_1 = require("../ThingAggregator");
let ThingManagerImpl = class ThingManagerImpl extends events_1.EventEmitter {
    constructor(_thingFactory, _thingAggregator) {
        super();
        this._thingFactory = _thingFactory;
        this._thingAggregator = _thingAggregator;
    }
    get things() {
        const thingDefs = this._thingAggregator.things;
        const thingImpls = thingDefs.map(x => this._thingFactory.createThing(x));
        return Object.freeze(thingImpls);
    }
};
ThingManagerImpl = __decorate([
    microinject_1.injectable(ThingManager_1.ThingManager),
    __param(0, microinject_1.inject(ThingFactory_1.ThingFactory)),
    __param(1, microinject_1.inject(ThingAggregator_1.ThingAggregator))
], ThingManagerImpl);
exports.ThingManagerImpl = ThingManagerImpl;
//# sourceMappingURL=ThingManagerImpl.js.map