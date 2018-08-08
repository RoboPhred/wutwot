"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingFactoryImpl_1 = require("./impl/ThingFactoryImpl");
const ThingManagerImpl_1 = require("./impl/ThingManagerImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ThingFactoryImpl_1.ThingFactoryImpl);
    bind(ThingManagerImpl_1.ThingManagerImpl);
});
//# sourceMappingURL=module.js.map