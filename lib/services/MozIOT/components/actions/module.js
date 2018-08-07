"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ActionAggregatorImpl_1 = require("./impl/ActionAggregatorImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ActionAggregatorImpl_1.ActionAggregatorImpl);
});
//# sourceMappingURL=module.js.map