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
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const microinject_1 = require("microinject");
const ActionSource_1 = require("../../../contracts/ActionSource");
const ActionAggregator_1 = require("../ActionAggregator");
let ActionAggregatorImpl = class ActionAggregatorImpl extends events_1.EventEmitter {
    constructor(_actionSources) {
        super();
        this._actionSources = _actionSources;
        this._actionSources.forEach(source => {
            source.on("action.add", e => this.emit("action.add", {
                thingId: e.thingId,
                action: scopeAction(source, e.action)
            }));
            source.on("action.remove", e => this.emit("action.remove", {
                thingId: e.thingId,
                action: scopeAction(source, e.action)
            }));
        });
    }
    getActions(thingId) {
        const actions = this._actionSources.reduce((actions, source) => {
            const sourceActions = source
                .getActions(thingId)
                .map(action => scopeAction(source, action));
            actions.push(...sourceActions);
            return actions;
        }, []);
        Object.freeze(actions);
        return actions;
    }
};
ActionAggregatorImpl = __decorate([
    microinject_1.injectable(ActionAggregator_1.ActionAggregator),
    __param(0, microinject_1.inject(ActionSource_1.ActionSource, { all: true }))
], ActionAggregatorImpl);
exports.ActionAggregatorImpl = ActionAggregatorImpl;
function scopeAction(source, action) {
    const newAction = Object.assign({}, action, { id: `${source.id}::${action.id}` });
    Object.freeze(newAction);
    return newAction;
}
//# sourceMappingURL=ActionAggregatorImpl.js.map