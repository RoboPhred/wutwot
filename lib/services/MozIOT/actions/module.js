"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ActionServiceImpl_1 = require("./services/impl/ActionServiceImpl");
const ActionRepositoryImpl_1 = require("./components/impl/ActionRepositoryImpl");
const ActionFactoryImpl_1 = require("./components/impl/ActionFactoryImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ActionServiceImpl_1.ActionServiceImpl);
    bind(ActionFactoryImpl_1.ActionFactoryImpl);
    bind(ActionRepositoryImpl_1.ActionRepositoryImpl);
});
//# sourceMappingURL=module.js.map