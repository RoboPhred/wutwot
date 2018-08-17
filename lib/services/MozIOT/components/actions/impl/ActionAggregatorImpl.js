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
const microinject_1 = require("microinject");
const ActionSource_1 = require("../../../contracts/ActionSource");
const ActionAggregator_1 = require("../ActionAggregator");
let ActionAggregatorImpl = class ActionAggregatorImpl {
    constructor(_actionSources) {
        this._actionSources = _actionSources;
        this.id = "aggregator";
    }
    getThingActions(thingContext) {
        const actions = [];
        for (const source of this._actionSources) {
            const sourceActions = source
                .getThingActions(thingContext)
                .map(x => scopeAction(source, x));
            actions.push(...sourceActions);
        }
        Object.freeze(actions);
        return actions;
    }
    getThingActionRequests(thingContext) {
        const invocations = [];
        for (const source of this._actionSources) {
            const sourceInvocations = source
                .getThingActionRequests(thingContext)
                .map(x => scopeInvocation(source, x));
            invocations.push(...sourceInvocations);
        }
        Object.freeze(invocations);
        return invocations;
    }
    requestAction(thingContext, actionId, input) {
        const ids = unscopeId(actionId);
        if (!ids.id || !ids.sourceId) {
            throw new Error(`Unknown action id "${actionId}" for thing "${thingContext.thingId}".`);
        }
        const source = this._actionSources.find(x => x.id === ids.sourceId);
        if (!source) {
            throw new Error(`Unknown action id "${actionId}" for thing "${thingContext}".`);
        }
        const invocation = source.requestAction(thingContext, ids.id, input);
        const scopedInvocation = scopeInvocation(source, invocation);
        return scopedInvocation;
    }
    cancelInvocation(invocationId) {
        const ids = unscopeId(invocationId);
        if (!ids.id || !ids.sourceId) {
            throw new Error(`Unknown invocation id "${invocationId}".`);
        }
        const source = this._actionSources.find(x => x.id === ids.sourceId);
        if (!source) {
            throw new Error(`Unknown invocation id "${invocationId}".`);
        }
        return source.cancelInvocation(ids.id);
    }
};
ActionAggregatorImpl = __decorate([
    microinject_1.injectable(ActionAggregator_1.ActionAggregator),
    __param(0, microinject_1.inject(ActionSource_1.ActionSource, { all: true }))
], ActionAggregatorImpl);
exports.ActionAggregatorImpl = ActionAggregatorImpl;
function scopeAction(source, action) {
    return Object.assign({}, action, { actionId: scopeId(source, action.actionId) });
}
function scopeInvocation(source, invocation) {
    return Object.assign({}, invocation, { requestId: scopeId(source, invocation.requestId), actionId: scopeId(source, invocation.actionId) });
}
function scopeId(source, id) {
    return `${source.id}::${id}`;
}
function unscopeId(id) {
    const parts = id.split("::");
    return {
        sourceId: parts[0],
        id: parts.slice(1).join("::")
    };
}
//# sourceMappingURL=ActionAggregatorImpl.js.map