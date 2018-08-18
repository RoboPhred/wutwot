"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const TestAdapterImpl_1 = require("./TestAdapterImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(TestAdapterImpl_1.TestAdapterImpl);
});
//# sourceMappingURL=module.js.map