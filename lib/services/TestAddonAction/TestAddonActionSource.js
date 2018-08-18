"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const v4_1 = __importDefault(require("uuid/v4"));
const MozIOT_1 = require("../MozIOT");
let TestAddonActionSource = class TestAddonActionSource {
    constructor() {
        this._invocationsById = new Map();
        this._actionId = "test-addon-action";
        this.id = "TestAddonActionSource";
    }
    getThingActions(thingContext) {
        const def = {
            actionId: this._actionId,
            thingId: thingContext.thingId,
            actionDescription: "A third party addon action",
            actionInput: { type: "null" },
            actionLabel: "Addon Action",
            actionMetadata: {}
        };
        return Object.freeze([def]);
    }
    getThingActionRequests(thingContext) {
        const invocations = Array.from(this._invocationsById.values()).filter(x => x.thingId === thingContext.thingId);
        return Object.freeze(invocations);
    }
    requestAction(thingContext, actionId) {
        if (actionId !== this._actionId) {
            throw new Error("This action source does not control the requested action.");
        }
        const request = Object.freeze({
            requestId: v4_1.default(),
            thingId: thingContext.thingId,
            actionId,
            timeRequested: new Date().toISOString()
        });
        console.log("Test action starting on", thingContext.thingId, "=>", request);
        this._invocationsById.set(request.requestId, request);
        setTimeout(() => {
            if (this._invocationsById.has(request.requestId)) {
                this._invocationsById.delete(request.requestId);
                console.log("Test action ending on", thingContext.thingId, "=>", request);
            }
        }, 10 * 1000);
        return request;
    }
    cancelRequest(invocationId) {
        if (!this._invocationsById.has(invocationId)) {
            return false;
        }
        this._invocationsById.delete(invocationId);
        return true;
    }
};
TestAddonActionSource = __decorate([
    microinject_1.injectable(MozIOT_1.ActionSource)
], TestAddonActionSource);
exports.TestAddonActionSource = TestAddonActionSource;
//# sourceMappingURL=TestAddonActionSource.js.map