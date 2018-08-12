"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const TestAddonActionSource_1 = require("./TestAddonActionSource");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(TestAddonActionSource_1.TestAddonActionSource);
});
//# sourceMappingURL=module.js.map