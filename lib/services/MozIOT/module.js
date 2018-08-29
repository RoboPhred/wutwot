"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./plugin-management/module"));
const module_2 = __importDefault(require("./things/module"));
const mozIotModule = microinject_1.composeModules(module_1.default, module_2.default);
exports.default = mozIotModule;
//# sourceMappingURL=module.js.map