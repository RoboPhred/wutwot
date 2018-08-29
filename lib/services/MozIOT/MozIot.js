"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const PluginManager_1 = require("./plugin-management/components/PluginManager");
const module_1 = __importDefault(require("./module"));
const components_1 = require("./things/components");
class MozIot {
    constructor() {
        this._container = new microinject_1.Container();
        this._container.load(module_1.default);
    }
    get things() {
        const registry = this._container.get(components_1.ThingRegistry);
        return Object.seal(Array.from(registry));
    }
    registerPlugin(plugin) {
        this._container.get(PluginManager_1.PluginManager).registerPlugin(plugin);
    }
}
exports.MozIot = MozIot;
//# sourceMappingURL=MozIot.js.map