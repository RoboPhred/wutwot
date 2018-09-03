"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingServiceImpl_1 = require("./services/impl/ThingServiceImpl");
const ThingFactoryImpl_1 = require("./components/impl/ThingFactoryImpl");
const ThingRepositoryImpl_1 = require("./components/impl/ThingRepositoryImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ThingServiceImpl_1.ThingServiceImpl);
    bind(ThingFactoryImpl_1.ThingFactoryImpl);
    bind(ThingRepositoryImpl_1.ThingRepositoryImpl);
});
//# sourceMappingURL=module.js.map