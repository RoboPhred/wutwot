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
const lodash_1 = require("lodash");
const microinject_1 = require("microinject");
const ThingSource_1 = require("../../../contracts/ThingSource");
const ThingFactory_1 = require("../ThingFactory");
const ThingManager_1 = require("../ThingManager");
let ThingManagerImpl = class ThingManagerImpl extends events_1.EventEmitter {
    constructor(_thingFactory, _thingSources) {
        super();
        this._thingFactory = _thingFactory;
        this._thingSources = _thingSources;
        this._things = new Map();
        this._thingSources.forEach(source => {
            source.on("thing.add", this._onThingAdded.bind(this, source));
            source.on("thing.remove", this._onThingRemoved.bind(this, source));
            source.things.forEach(def => this._onThingAdded(source, {
                thingId: def.thingId,
                thingDef: def
            }));
        });
    }
    get things() {
        return Object.freeze(Array.from(this._things.values()));
    }
    _onThingAdded(source, e) {
        const externalId = this._createExternalId(e.thingDef.thingId, source);
        if (this._things.has(externalId)) {
            return;
        }
        const context = Object.assign({}, e.thingDef, { thingId: externalId, thingSourceThingId: e.thingId, thingSourceId: source.id, thingMetadata: e.thingDef.thingMetadata
                ? lodash_1.cloneDeep(e.thingDef.thingMetadata)
                : {} });
        const thing = this._thingFactory.createThing(context);
        this._things.set(externalId, thing);
        this.emit("thing.add", {
            thingId: e.thingId,
            thing: thing
        });
    }
    _onThingRemoved(source, e) {
        const externalId = this._createExternalId(e.thingId, source);
        if (!this._things.delete(externalId)) {
            return;
        }
        this.emit("thing.remove", {
            thingId: externalId
        });
    }
    _createExternalId(defId, source) {
        return `${source.id}--${defId}`;
    }
};
ThingManagerImpl = __decorate([
    microinject_1.injectable(ThingManager_1.ThingManager),
    __param(0, microinject_1.inject(ThingFactory_1.ThingFactory)),
    __param(1, microinject_1.inject(ThingSource_1.ThingSource, { all: true }))
], ThingManagerImpl);
exports.ThingManagerImpl = ThingManagerImpl;
//# sourceMappingURL=ThingManagerImpl.js.map