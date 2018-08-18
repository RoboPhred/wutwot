"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingActionImpl {
    constructor(_thingContext, _actionContext, _actionAggregator) {
        this._thingContext = _thingContext;
        this._actionContext = _actionContext;
        this._actionAggregator = _actionAggregator;
    }
    get id() {
        return this._actionContext.actionId;
    }
    get label() {
        return this._actionContext.actionLabel;
    }
    get description() {
        return this._actionContext.actionDescription;
    }
    get input() {
        return this._actionContext.actionInput;
    }
    get requests() {
        const requests = this._actionAggregator
            .getThingActionRequests(this._thingContext)
            .filter(x => x.actionId === this._actionContext.actionId);
        const instances = requests.map(x => this._requestfToInstance(x));
        return Object.freeze(instances);
    }
    request(input) {
        const invocation = this._actionAggregator.requestAction(this._actionContext, input);
        return this._requestfToInstance(invocation);
    }
    _requestfToInstance(requestContext) {
        const source = this._actionAggregator;
        const request = {
            id: requestContext.requestId,
            timeRequested: requestContext.requestCreatedTime,
            status: "pending",
            cancel() {
                if (request.status === "cancelled") {
                    return false;
                }
                request.status = "cancelled";
                return source.cancelRequest(requestContext);
            }
        };
        return request;
    }
}
exports.ThingActionImpl = ThingActionImpl;
//# sourceMappingURL=ThingActionImpl.js.map