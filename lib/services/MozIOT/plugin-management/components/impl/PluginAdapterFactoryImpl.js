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
const things_1 = require("../../../things");
const actions_1 = require("../../../actions");
const components_1 = require("../../../action-requests/components");
const PluginAdapterFactory_1 = require("../PluginAdapterFactory");
const PluginAdapterImpl_1 = require("./PluginAdapterImpl");
let PluginAdapterFactoryImpl = class PluginAdapterFactoryImpl {
    constructor(_thingService, _actionService, _actionRequestFactory, _actionRequestRepository) {
        this._thingService = _thingService;
        this._actionService = _actionService;
        this._actionRequestFactory = _actionRequestFactory;
        this._actionRequestRepository = _actionRequestRepository;
    }
    createPluginAdapter(plugin) {
        return new PluginAdapterImpl_1.PluginAdapterImpl(plugin, this._thingService, this._actionService, this._actionRequestFactory, this._actionRequestRepository);
    }
};
PluginAdapterFactoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(PluginAdapterFactory_1.PluginAdapterFactory),
    __param(0, microinject_1.inject(things_1.ThingService)),
    __param(1, microinject_1.inject(actions_1.ActionService)),
    __param(2, microinject_1.inject(components_1.ActionRequestFactory)),
    __param(3, microinject_1.inject(components_1.ActionRequestRepository))
], PluginAdapterFactoryImpl);
exports.PluginAdapterFactoryImpl = PluginAdapterFactoryImpl;
//# sourceMappingURL=PluginAdapterFactoryImpl.js.map