"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingActionImpl {
    constructor(_def, _thingContext, _source) {
        this._def = _def;
        this._thingContext = _thingContext;
        this._source = _source;
    }
    get id() {
        return this._def.actionId;
    }
    get label() {
        return this._def.label;
    }
    get description() {
        return this._def.description;
    }
    get input() {
        return this._def.input;
    }
    get requests() {
        const invocations = this._source
            .getThingActionRequests(this._thingContext)
            .filter(x => x.actionId === this._def.actionId);
        const requests = invocations.map(x => this._requestDefToRequest(x));
        return Object.freeze(requests);
    }
    invoke(input) {
        const invocation = this._source.requestAction(this._thingContext, this._def.actionId, input);
        return this._requestDefToRequest(invocation);
    }
    _requestDefToRequest(invocation) {
        const source = this._source;
        const request = {
            id: invocation.requestId,
            timeRequested: invocation.timeRequested,
            status: "pending",
            cancel() {
                if (request.status === "cancelled") {
                    return false;
                }
                request.status = "cancelled";
                return source.cancelInvocation(invocation.requestId);
            }
        };
        return request;
    }
}
exports.ThingActionImpl = ThingActionImpl;
//# sourceMappingURL=ThingActionImpl.js.map