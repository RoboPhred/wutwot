"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = __importDefault(require("./module"));
const contracts_1 = require("./contracts");
const MozIot_1 = require("../MozIot");
const TestPlugin_1 = require("../TestPlugin/TestPlugin");
class App {
    constructor() {
        this._container = new microinject_1.Container();
        this._container.load(module_1.default);
        this._container.get(MozIot_1.MozIot).registerPlugin(new TestPlugin_1.TestPlugin());
    }
    run() {
        const repl = this._container.getAll(contracts_1.Entrypoint);
        repl.forEach(x => x.start());
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map