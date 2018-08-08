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
const ThingAggregator_1 = require("../ThingAggregator");
const contracts_1 = require("../../../contracts");
let ThingAggregatorImpl = class ThingAggregatorImpl {
    constructor(_thingSources) {
        this._thingSources = _thingSources;
        this.id = "aggregator";
    }
    get things() {
        const things = [];
        for (const source of this._thingSources) {
            const sourceThings = source.things.map(x => scopeThing(source, x));
            things.push(...sourceThings);
        }
        Object.freeze(things);
        return things;
    }
};
ThingAggregatorImpl = __decorate([
    microinject_1.injectable(ThingAggregator_1.ThingAggregator),
    __param(0, microinject_1.inject(contracts_1.ThingSource, { all: true }))
], ThingAggregatorImpl);
exports.ThingAggregatorImpl = ThingAggregatorImpl;
function scopeThing(source, thing) {
    return Object.assign({}, thing, { id: scopeId(source, thing.id) });
}
function scopeId(source, id) {
    return `${source.id}::${id}`;
}
function unscopeId(id) {
    const parts = id.split("::");
    return {
        sourceId: parts[0],
        id: parts.slice(1).join("::")
    };
}
//# sourceMappingURL=ThingAggregatorImpl.js.map