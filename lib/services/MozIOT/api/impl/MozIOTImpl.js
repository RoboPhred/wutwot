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
const things_1 = require("../../things");
const MozIOT_1 = require("../MozIOT");
const components_1 = require("../../things/components");
let MozIOTImpl = class MozIOTImpl {
    constructor(_thingPluginManager, _thingRegistry) {
        this._thingPluginManager = _thingPluginManager;
        this._thingRegistry = _thingRegistry;
        _thingPluginManager.run();
    }
    get things() {
        // TODO: Persistent map of ThingContext from _thingRegistry to Thing.
        throw new Error("Not Implemented");
    }
};
MozIOTImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(MozIOT_1.MozIOT),
    __param(0, microinject_1.inject(components_1.ThingPluginManager)),
    __param(1, microinject_1.inject(things_1.ThingRegistry))
], MozIOTImpl);
exports.MozIOTImpl = MozIOTImpl;
//# sourceMappingURL=MozIOTImpl.js.map