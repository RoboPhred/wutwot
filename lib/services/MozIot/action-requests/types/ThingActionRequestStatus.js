"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThingActionRequestStatus;
(function (ThingActionRequestStatus) {
    ThingActionRequestStatus["Pending"] = "pending";
    ThingActionRequestStatus["Started"] = "started";
    ThingActionRequestStatus["Completed"] = "completed";
    ThingActionRequestStatus["Cancelled"] = "cancelled";
    ThingActionRequestStatus["Error"] = "error";
})(ThingActionRequestStatus = exports.ThingActionRequestStatus || (exports.ThingActionRequestStatus = {}));
(function (ThingActionRequestStatus) {
    function isFinalStatus(status) {
        switch (status) {
            case ThingActionRequestStatus.Cancelled:
            case ThingActionRequestStatus.Completed:
            case ThingActionRequestStatus.Error:
                return true;
            default:
                return false;
        }
    }
    ThingActionRequestStatus.isFinalStatus = isFinalStatus;
    function canTransition(from, to) {
        if (from === to) {
            return false;
        }
        if (to === ThingActionRequestStatus.Pending) {
            return false;
        }
        if (isFinalStatus(from)) {
            return false;
        }
        return true;
    }
    ThingActionRequestStatus.canTransition = canTransition;
})(ThingActionRequestStatus = exports.ThingActionRequestStatus || (exports.ThingActionRequestStatus = {}));
//# sourceMappingURL=ThingActionRequestStatus.js.map