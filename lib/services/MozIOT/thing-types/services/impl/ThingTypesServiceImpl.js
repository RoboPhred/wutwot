"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingTypesService_1 = require("../ThingTypesService");
let ThingTypesServiceImpl = class ThingTypesServiceImpl {
    constructor() {
        this._capabilities = new Map();
    }
    addType(thingId, type) {
        let caps = this._capabilities.get(thingId);
        if (caps == null) {
            caps = new Set();
            this._capabilities.set(thingId, caps);
        }
        caps.add(type);
    }
    getTypes(thingId) {
        return Array.from(this._capabilities.get(thingId) || []);
    }
};
ThingTypesServiceImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ThingTypesService_1.ThingTypesService)
], ThingTypesServiceImpl);
exports.ThingTypesServiceImpl = ThingTypesServiceImpl;
//# sourceMappingURL=ThingTypesServiceImpl.js.map