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
    constructor(actionSources) {
        this._actionSources = new Map();
        for (const source of actionSources) {
            // TODO: Could skip source IDs and auto-prefix where needed.
            if (this._actionSources.has(source.id)) {
                throw new Error(`Duplicate source ID ${source.id}.`);
            }
            this._actionSources.set(source.id, source);
        }
    }
    getThingActions(thingContext) {
        const actions = [];
        for (const source of this._actionSources.values()) {
            const sourceActions = source
                .getThingActions(thingContext)
                .map(actionDef => this._actionToContext(source, actionDef));
            actions.push(...sourceActions);
        }
        Object.freeze(actions);
        return actions;
    }
    getThingActionRequests(thingContext) {
        const contexts = [];
        for (const source of this._actionSources.values()) {
            const sourceInvocations = source
                .getThingActionRequests(thingContext)
                .map(request => {
                const context = this._requestToContext(source, request);
                return context;
            });
            contexts.push(...sourceInvocations);
        }
        Object.freeze(contexts);
        return contexts;
    }
    requestAction(actionContext, input) {
        const { actionId, actionSourceId } = actionContext;
        const source = this._actionSources.get(actionSourceId);
        if (!source) {
            throw new Error(`Unknown action source id "${actionId}" for context "${JSON.stringify(actionContext)}".`);
        }
        const request = source.requestAction(actionContext, input);
        const context = this._requestToContext(source, request);
        return context;
    }
    cancelRequest(requestContext) {
        const { actionSourceId } = requestContext;
        const source = this._actionSources.get(actionSourceId);
        if (!source) {
            throw new Error(`Unknown action id "${actionSourceId}" in request ${JSON.stringify(requestContext)}.`);
        }
        return source.cancelRequest(requestContext);
    }
    _actionToContext(source, actionDef) {
        const context = Object.assign({}, actionDef, { actionSourceId: source.id, actionSourceActionId: actionDef.actionId, actionId: `${source.id}--${actionDef.actionId}` });
        return context;
    }
    _requestToContext(source, request) {
        const context = Object.assign({}, request, { requestId: `${source.id}--${request.requestId}`, actionSourceId: source.id, actionSourceActionId: `${source.id}--${request.actionId}`, actionSourceRequestId: request.requestId });
        return context;
    }
};
ActionAggregatorImpl = __decorate([
    microinject_1.injectable(ActionAggregator_1.ActionAggregator),
    __param(0, microinject_1.inject(ActionSource_1.ActionSource, { all: true }))
], ActionAggregatorImpl);
exports.ActionAggregatorImpl = ActionAggregatorImpl;
//# sourceMappingURL=ActionAggregatorImpl.js.map