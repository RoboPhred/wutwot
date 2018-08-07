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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = __importDefault(require("repl"));
const microinject_1 = require("microinject");
const core_decorators_1 = require("core-decorators");
const contracts_1 = require("../../contracts");
const TestAdapter_1 = require("../TestAdapter");
const ThingManager_1 = require("../MozIOT/components/things/ThingManager");
let ReplServer = class ReplServer {
    constructor(_testAdapter, _thingManager) {
        this._testAdapter = _testAdapter;
        this._thingManager = _thingManager;
    }
    start() {
        if (this._replServer) {
            return;
        }
        if (!process.stdin.isTTY) {
            return;
        }
        this._replServer = repl_1.default.start({
            prompt: ">"
        });
        const reset = (context) => {
            context.thingManager = this._thingManager;
        };
        reset(this._replServer.context);
        this._replServer.on("reset", reset);
        this._replServer.defineCommand("add-test-thing", this._addTestThing);
        this._replServer.defineCommand("remove-test-thing", this._removeTestThing);
    }
    _addTestThing(arg) {
        arg = arg.trim();
        let thingDef;
        if (arg.length > 0) {
            try {
                thingDef = JSON.parse(arg);
            }
            catch (e) {
                throw new repl_1.default.Recoverable(e);
            }
        }
        this._testAdapter.addTestThing(thingDef);
    }
    _removeTestThing(id) {
        this._testAdapter.removeTestThing(id.length > 0 ? id : undefined);
    }
};
__decorate([
    core_decorators_1.autobind()
], ReplServer.prototype, "_addTestThing", null);
__decorate([
    core_decorators_1.autobind()
], ReplServer.prototype, "_removeTestThing", null);
ReplServer = __decorate([
    microinject_1.injectable(contracts_1.Entrypoint),
    __param(0, microinject_1.inject(TestAdapter_1.TestAdapter)),
    __param(1, microinject_1.inject(ThingManager_1.ThingManager))
], ReplServer);
exports.ReplServer = ReplServer;
//# sourceMappingURL=ReplServer.js.map