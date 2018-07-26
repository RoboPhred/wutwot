"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./services/module"));
function createModule() {
    return microinject_1.composeModules(module_1.default());
}
exports.default = createModule;
//# sourceMappingURL=module.js.map