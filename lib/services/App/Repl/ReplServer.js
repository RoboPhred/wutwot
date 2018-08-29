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
const contracts_1 = require("../contracts");
const MozIot_1 = require("../../MozIot");
let ReplServer = class ReplServer {
    constructor(_mozIoT) {
        this._mozIoT = _mozIoT;
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
            context.thingManager = this._mozIoT;
        };
        reset(this._replServer.context);
        this._replServer.on("reset", reset);
    }
};
ReplServer = __decorate([
    microinject_1.injectable(contracts_1.Entrypoint),
    __param(0, microinject_1.inject(MozIot_1.MozIot))
], ReplServer);
exports.ReplServer = ReplServer;
//# sourceMappingURL=ReplServer.js.map