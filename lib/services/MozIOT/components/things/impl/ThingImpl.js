"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThingActionImpl_1 = require("./ThingActionImpl");
class ThingImpl {
    constructor(_context, _actionAggregator) {
        this._context = _context;
        this._actionAggregator = _actionAggregator;
        this.id = _context.thingId;
        this.types = _context.thingTypes || [];
        this.name = _context.thingDefaultName || "Unnamed Thing";
        this.description = _context.thingDefaultDescription || "";
    }
    get actions() {
        // TODO: Make these persistent.  Need event support.
        const actions = this._actionAggregator
            .getThingActions(this._context)
            .map(def => new ThingActionImpl_1.ThingActionImpl(def, this._context, this._actionAggregator));
        return Object.freeze(actions);
    }
}
exports.ThingImpl = ThingImpl;
//# sourceMappingURL=ThingImpl.js.map