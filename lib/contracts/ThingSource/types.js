"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThingDef;
(function (ThingDef) {
    function equals(a, b) {
        return a.id === b.id && a.type === b.type;
    }
    ThingDef.equals = equals;
    function isSameType(a, b) {
        return a.type === b.type;
    }
    ThingDef.isSameType = isSameType;
})(ThingDef = exports.ThingDef || (exports.ThingDef = {}));
//# sourceMappingURL=types.js.map