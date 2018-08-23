"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ActionRepositoryImpl_1 = require("./components/impl/ActionRepositoryImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ActionRepositoryImpl_1.ThingRepositoryImpl);
});
//# sourceMappingURL=module.js.map