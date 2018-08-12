"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./services/Endpoint/module"));
const module_2 = __importDefault(require("./services/MozIOT/module"));
const module_3 = __importDefault(require("./services/Repl/module"));
const module_4 = __importDefault(require("./services/TestAdapter/module"));
const module_5 = __importDefault(require("./services/TestAddonAction/module"));
function createModule() {
    return microinject_1.composeModules(module_1.default, module_2.default, module_3.default, module_4.default, module_5.default);
}
exports.default = createModule;
//# sourceMappingURL=module.js.map