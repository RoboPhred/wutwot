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
const ThingSource_1 = require("../../../contracts/ThingSource");
const Thing_1 = require("../../Thing");
const ThingManager_1 = require("../ThingManager");
let ThingManagerImpl = class ThingManagerImpl extends events_1.EventEmitter {
    constructor(_thingFactory, _thingSources) {
        super();
        this._thingFactory = _thingFactory;
        this._thingSources = _thingSources;
        this._discoveredThings = new Map();
    }
    get things() {
        const things = Array.from(this._discoveredThings.values());
        return Object.freeze(things);
    }
    _addThing(thingDef) {
        const { id } = thingDef;
        if (this._discoveredThings.has(id)) {
            return;
        }
        const thing = this._thingFactory.createThing(thingDef);
        this._discoveredThings.set(id, thing);
    }
    _removeThing(thingDef) {
        this._discoveredThings.delete(thingDef.id);
    }
};
ThingManagerImpl = __decorate([
    microinject_1.injectable(ThingManager_1.ThingManager),
    __param(0, microinject_1.inject(Thing_1.ThingFactory)),
    __param(1, microinject_1.inject(ThingSource_1.ThingSource, { all: true }))
], ThingManagerImpl);
exports.ThingManagerImpl = ThingManagerImpl;
//# sourceMappingURL=ThingManagerImpl.js.map