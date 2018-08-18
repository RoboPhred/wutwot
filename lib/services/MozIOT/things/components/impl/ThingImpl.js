"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThingActionImpl_1 = require("./ThingActionImpl");
class ThingImpl {
    constructor(_thingContext, _actionAggregator) {
        this._thingContext = _thingContext;
        this._actionAggregator = _actionAggregator;
        this.id = _thingContext.thingId;
        this.types = _thingContext.thingTypes || [];
        this.name = _thingContext.thingDefaultName || "Unnamed Thing";
        this.description = _thingContext.thingDefaultDescription || "";
    }
    get actions() {
        // TODO: Make these persistent.  Need event support.
        const actions = {};
        this._actionAggregator
            .getThingActions(this._thingContext)
            .forEach(actionContext => {
            actions[actionContext.actionId] = new ThingActionImpl_1.ThingActionImpl(this._thingContext, actionContext, this._actionAggregator);
        });
        return Object.freeze(actions);
    }
}
exports.ThingImpl = ThingImpl;
//# sourceMappingURL=ThingImpl.js.map