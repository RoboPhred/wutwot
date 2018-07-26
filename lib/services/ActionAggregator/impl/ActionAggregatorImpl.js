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
        this.id = "aggregator";
        this._actions = new Map();
        this._actionSources.forEach(source => {
            source.on("action.add", e => this._addAction(source, e.action));
            source.on("action.remove", e => this._removeAction(source, e.action));
        });
    }
    get actions() {
        const actions = Array.from(this._actions.values()).map(x => x.publicAction);
        Object.freeze(actions);
        return actions;
    }
    _addAction(source, action) {
        const publicId = this._scopeActionId(source, action);
        const publicAction = Object.freeze(Object.assign({}, action, { id: publicId }));
        let details = this._actions.get(publicId);
        if (details === undefined) {
            details = {
                source,
                sourceAction: action,
                publicAction
            };
            this._actions.set(publicId, details);
        }
        this._actions.set(publicId, details);
        const e = {
            action: publicAction
        };
        this.emit("action.add", e);
    }
    _removeAction(source, action) {
        const publicId = this._scopeActionId(source, action);
        const details = this._actions.get(publicId);
        if (!details) {
            return;
        }
        this._actions.delete(publicId);
        const e = {
            action: details.publicAction
        };
        this.emit("action.remove", e);
    }
    _scopeActionId(source, action) {
        return `${source.id}::${action.id}`;
    }
};
ActionAggregatorImpl = __decorate([
    microinject_1.injectable(ActionAggregator_1.ActionAggregator),
    __param(0, microinject_1.inject(ActionSource_1.ActionSource, { all: true }))
], ActionAggregatorImpl);
exports.ActionAggregatorImpl = ActionAggregatorImpl;
//# sourceMappingURL=ActionAggregatorImpl.js.map