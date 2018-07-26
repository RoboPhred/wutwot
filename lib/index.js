"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./module"));
const ReplServer_1 = require("./Repl/ReplServer");
const appModule = module_1.default();
const container = new microinject_1.Container();
container.load(appModule);
if (process.stdin.isTTY) {
    const repl = container.get(ReplServer_1.ReplServer);
    repl.start();
}
//# sourceMappingURL=index.js.map