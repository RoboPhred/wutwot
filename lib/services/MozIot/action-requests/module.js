"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ActionRequestFactoryImpl_1 = require("./components/impl/ActionRequestFactoryImpl");
const ActionRequestRepositoryImpl_1 = require("./components/impl/ActionRequestRepositoryImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ActionRequestFactoryImpl_1.ActionRequestFactoryImpl);
    bind(ActionRequestRepositoryImpl_1.ActionRequestRepositoryImpl);
});
//# sourceMappingURL=module.js.map