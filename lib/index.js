"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_map_support_1 = require("source-map-support");
source_map_support_1.install();
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./module"));
const contracts_1 = require("./contracts");
const appModule = module_1.default();
const container = new microinject_1.Container();
container.load(appModule);
const repl = container.getAll(contracts_1.Entrypoint);
repl.forEach(x => x.start());
//# sourceMappingURL=index.js.map