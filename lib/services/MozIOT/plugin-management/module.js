"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const PluginAdapterFactoryImpl_1 = require("./components/impl/PluginAdapterFactoryImpl");
const PluginManagerImpl_1 = require("./components/impl/PluginManagerImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(PluginAdapterFactoryImpl_1.PluginAdapterFactoryImpl);
    bind(PluginManagerImpl_1.PluginManagerImpl);
});
//# sourceMappingURL=module.js.map