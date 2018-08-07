"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./components/actions/module"));
const module_2 = __importDefault(require("./components/things/module"));
exports.default = microinject_1.composeModules(module_1.default, module_2.default);
//# sourceMappingURL=module.js.map