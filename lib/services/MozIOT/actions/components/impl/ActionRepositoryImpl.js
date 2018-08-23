"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const microinject_1 = require("microinject");
const ActionRepository_1 = require("../ActionRepository");
const ActionRegistry_1 = require("../ActionRegistry");
let ThingRepositoryImpl = class ThingRepositoryImpl extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._actions = [];
    }
    get actions() {
        return [...this._actions];
    }
    get(thingId, actionId) {
        return this._actions.find(x => x.thingId === thingId && x.actionId === actionId);
    }
    addAction(action) {
        if (this.get(action.thingId, action.actionId)) {
            throw new Error("Duplicate actionId for thing.");
        }
        action = Object.freeze(Object.assign({}, action));
        this._actions.push(action);
        const e = {
            thingId: action.thingId,
            actionId: action.actionId,
            action
        };
        this.emit("action.add", e);
    }
    removeAction(thingId, actionId) {
        const idx = this._actions.findIndex(x => x.thingId === thingId && x.actionId === actionId);
        if (idx !== -1) {
            this._actions.splice(idx, 1);
            const e = {
                thingId,
                actionId
            };
            this.emit("action.remove", e);
        }
    }
};
ThingRepositoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionRepository_1.ActionRepository),
    microinject_1.provides(ActionRegistry_1.ActionRegistry)
], ThingRepositoryImpl);
exports.ThingRepositoryImpl = ThingRepositoryImpl;
//# sourceMappingURL=ActionRepositoryImpl.js.map