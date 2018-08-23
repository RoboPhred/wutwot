"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingPluginManagerImpl_1 = require("./components/impl/ThingPluginManagerImpl");
const ThingRepositoryImpl_1 = require("./components/impl/ThingRepositoryImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ThingPluginManagerImpl_1.ThingPluginManagerImpl);
    bind(ThingRepositoryImpl_1.ThingRepositoryImpl);
});
//# sourceMappingURL=module.js.map