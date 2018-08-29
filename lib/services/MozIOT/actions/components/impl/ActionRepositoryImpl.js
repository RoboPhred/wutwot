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
const ActionRegistry_1 = require("../ActionRegistry");
const ActionRepository_1 = require("../ActionRepository");
let ActionRepositoryImpl = class ActionRepositoryImpl extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._actionsByThingId = new Map();
    }
    addAction(thingId, action) {
        let actions = this._actionsByThingId.get(thingId);
        if (!actions) {
            actions = [];
            this._actionsByThingId.set(thingId, actions);
        }
        if (actions.find(x => x.id === action.id)) {
            throw new Error("Duplicate action id.");
        }
        actions.push(action);
        const e = {
            thingId,
            actionId: action.id,
            action
        };
        this.emit("action.add", e);
    }
    removeAction(thingId, actionId) {
        const actions = this._actionsByThingId.get(thingId) || [];
        const idx = actions.findIndex(x => x.id === actionId);
        if (idx !== -1) {
            actions.splice(idx, 1);
            const e = {
                thingId,
                actionId
            };
            this.emit("action.remove", e);
        }
    }
    get(thingId, actionId) {
        const actions = this._actionsByThingId.get(thingId) || [];
        return actions.find(x => x.id === actionId);
    }
    getForThing(thingId) {
        const actions = this._actionsByThingId.get(thingId) || [];
        return [...actions];
    }
};
ActionRepositoryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.singleton(),
    microinject_1.provides(ActionRegistry_1.ActionRegistry),
    microinject_1.provides(ActionRepository_1.ActionRepository)
], ActionRepositoryImpl);
exports.ActionRepositoryImpl = ActionRepositoryImpl;
//# sourceMappingURL=ActionRepositoryImpl.js.map