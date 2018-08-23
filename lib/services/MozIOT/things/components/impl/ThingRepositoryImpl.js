"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const microinject_1 = require("microinject");
const ThingRepository_1 = require("../ThingRepository");
const ThingRegistry_1 = require("../ThingRegistry");
let ThingRepositoryImpl = class ThingRepositoryImpl extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._things = new Map();
    }
    get things() {
        return Array.from(this._things.values());
    }
    get(thingId) {
        return this._things.get(thingId);
    }
    addThing(thing) {
        if (this._things.has(thing.thingId)) {
            throw new Error("Duplicate thingId.");
        }
        thing = Object.freeze(Object.assign({}, thing));
        this._things.set(thing.thingId, thing);
        const e = {
            thingId: thing.thingId,
            thing
        };
        this.emit("thing.add", e);
    }
    removeThing(thingId) {
        if (this._things.delete(thingId)) {
            const e = {
                thingId
            };
            this.emit("thing.remove", e);
        }
    }
};
ThingRepositoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ThingRepository_1.ThingRepository),
    microinject_1.provides(ThingRegistry_1.ThingRegistry)
], ThingRepositoryImpl);
exports.ThingRepositoryImpl = ThingRepositoryImpl;
//# sourceMappingURL=ThingRepositoryImpl.js.map