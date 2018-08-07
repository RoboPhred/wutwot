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
const events_1 = require("events");
const microinject_1 = require("microinject");
const v4_1 = __importDefault(require("uuid/v4"));
const MozIOT_1 = require("../MozIOT");
const testActionDef = Object.freeze({
    id: "thing-test-action",
    label: "Do That Thing",
    description: "A test action",
    input: { type: "null" }
});
let TestAdapterImpl = class TestAdapterImpl extends events_1.EventEmitter {
    constructor() {
        super();
        this.id = "test-adapter";
        this._defs = [];
        this._invocations = [];
        this.addTestThing();
    }
    get things() {
        return Object.freeze([...this._defs]);
    }
    getThingActions(thingId) {
        if (!this._defs.find(x => x.id === thingId)) {
            return [];
        }
        return Object.freeze([
            Object.assign({}, testActionDef, { thingId })
        ]);
    }
    getThingInvocations(thingId) {
        const results = this._invocations.filter(x => x.thingId === thingId);
        Object.freeze(results);
        return results;
    }
    invokeAction(thingId, actionId, input) {
        const invocation = Object.freeze({
            id: v4_1.default(),
            thingId,
            actionId,
            timeRequested: new Date().toISOString()
        });
        console.log("Test action starting on", thingId, "=>", invocation);
        setTimeout(() => {
            const index = this._invocations.indexOf(invocation);
            if (index > -1) {
                console.log("Test action ending on", thingId, "=>", invocation);
                this._invocations.splice(index, 1);
            }
        }, 10 * 1000);
        return invocation;
    }
    cancelInvocation(invocationId) {
        const index = this._invocations.findIndex(x => x.id === invocationId);
        if (index) {
            this._invocations.splice(index, 1);
            return true;
        }
        return false;
    }
    addTestThing(def) {
        if (!def) {
            def = {};
        }
        const id = def.id ||
            `test-device-${Math.random()
                .toString()
                .substr(2)}`;
        const defaultName = def.defaultName || `Named: ${id}`;
        const finalDef = {
            id,
            type: "test-thing",
            description: "A test thing",
            defaultName
        };
        Object.freeze(finalDef);
        this._defs.push(finalDef);
        this.emit("thing.add", { thing: finalDef });
    }
    removeTestThing(id) {
        if (this._defs.length === 0) {
            return;
        }
        if (id == null) {
            id = this._defs[0].id;
        }
        const index = this._defs.findIndex(x => x.id === id);
        if (index === -1) {
            return;
        }
        const def = this._defs[index];
        this._defs.splice(index, 1);
        this.emit("thing.remove", { thing: def });
    }
};
TestAdapterImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(MozIOT_1.ThingSource),
    microinject_1.provides(MozIOT_1.ActionSource),
    microinject_1.singleton()
], TestAdapterImpl);
exports.TestAdapterImpl = TestAdapterImpl;
//# sourceMappingURL=TestAdapterImpl.js.map