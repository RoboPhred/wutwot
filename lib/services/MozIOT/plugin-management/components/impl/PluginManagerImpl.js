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
const PluginAdapterFactory_1 = require("../PluginAdapterFactory");
const PluginManager_1 = require("../PluginManager");
let PluginManagerImpl = class PluginManagerImpl {
    constructor(_pluginAdapterFactory) {
        this._pluginAdapterFactory = _pluginAdapterFactory;
        this._adapters = new Set();
    }
    registerPlugin(plugin) {
        const adapter = this._pluginAdapterFactory.createPluginAdapter(plugin);
        this._adapters.add(adapter);
    }
};
PluginManagerImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(PluginManager_1.PluginManager),
    __param(0, microinject_1.inject(PluginAdapterFactory_1.PluginAdapterFactory))
], PluginManagerImpl);
exports.PluginManagerImpl = PluginManagerImpl;
//# sourceMappingURL=PluginManagerImpl.js.map