"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ThingImpl {
    constructor(def, _actionAggregator) {
        this._actionAggregator = _actionAggregator;
        this.id = def.id;
        this.type = def.type;
        this.name = def.defaultName || "Unnamed Thing";
        this.description = def.defaultDescription || "";
    }
    get actions() { }
}
exports.ThingImpl = ThingImpl;
//# sourceMappingURL=ThingImpl.js.map