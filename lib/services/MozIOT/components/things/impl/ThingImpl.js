"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThingActionImpl_1 = require("./ThingActionImpl");
class ThingImpl {
    constructor(def, _actionAggregator) {
        this._actionAggregator = _actionAggregator;
        this.id = def.id;
        this.type = def.type;
        this.name = def.defaultName || "Unnamed Thing";
        this.description = def.defaultDescription || "";
    }
    get actions() {
        // TODO: Make these persistent.  Need event support.
        const actions = this._actionAggregator
            .getThingActions(this.id)
            .map(def => new ThingActionImpl_1.ThingActionImpl(def, this._actionAggregator));
        const records = {};
        for (const action of actions) {
            records[action.id] = action;
        }
        return Object.freeze(records);
    }
}
exports.ThingImpl = ThingImpl;
//# sourceMappingURL=ThingImpl.js.map