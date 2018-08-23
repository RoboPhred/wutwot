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
const testActionDef = Object.freeze({
    actionId: "thing-test-action",
    actionLabel: "Do That Thing",
    actionDescription: "A test action",
    actionInput: { type: "null" },
    actionMetadata: {}
});
let TestAdapterImpl = class TestAdapterImpl {
    constructor() {
        this.id = "test-adapter";
        this._thingPlugin = null;
        this._actionPlugin = null;
        this._requests = [];
    }
    // TODO: onRegisterThingSource and onRegisterActionSource can be combined
    //  if we are smarter about how we check for what implements what.
    // TODO: For best results, pass it in the ctor using the yet
    //  incomplete microinject instantiation time parameter stuff.
    onRegisterThingProvider(plugin) {
        this._thingPlugin = plugin;
        // One of these will noop as both will not be called yet.
        this.addTestThing();
    }
    onRegisterThingActionSource(plugin) {
        this._actionPlugin = plugin;
        // One of these will noop as both will not be called yet.
        this.addTestThing();
    }
    onActionRequested(actionContext, input) {
        const request = Object.freeze({
            requestId: v4_1.default(),
            thingId: actionContext.thingId,
            actionId: actionContext.actionId,
            requestCreatedTime: new Date().toISOString(),
            requestMetadata: {}
        });
        console.log("Test action starting on", actionContext.thingId, "=>", request);
        this._requests.push(request);
        setTimeout(() => {
            const index = this._requests.indexOf(request);
            if (index > -1) {
                console.log("Test action ending on", actionContext.thingId, "=>", request);
                this._requests.splice(index, 1);
            }
        }, 10 * 1000);
        this._actionPlugin.addActionRequest(request);
    }
    onActionRequestCancelRequested(requestContext) {
        const { requestId } = requestContext;
        const index = this._requests.findIndex(x => x.requestId === requestId);
        if (index) {
            this._requests.splice(index, 1);
            this._actionPlugin.removeActionRequest(requestContext.requestId);
            return true;
        }
        return false;
    }
    addTestThing(def) {
        if (!this._actionPlugin || !this._thingPlugin) {
            return;
        }
        if (!def) {
            def = {};
        }
        const thingId = def.thingId ||
            `test-device-${Math.random()
                .toString()
                .substr(2)}`;
        const defaultName = def.thingDefaultName || `Named: ${thingId}`;
        const finalDef = {
            thingId,
            description: "A test thing",
            defaultName
        };
        this._thingPlugin.addThing(finalDef);
        this._actionPlugin.addAction(Object.assign({}, testActionDef, { thingId }));
    }
    removeTestThing(thingId) {
        this._thingPlugin.removeThing(thingId);
    }
};
TestAdapterImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(MozIOT_1.ThingProviderPlugin),
    microinject_1.provides(MozIOT_1.ActionProviderPlugin)
], TestAdapterImpl);
exports.TestAdapterImpl = TestAdapterImpl;
//# sourceMappingURL=TestAdapterImpl.js.map