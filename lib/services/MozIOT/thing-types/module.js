"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingTypesServiceImpl_1 = require("./services/impl/ThingTypesServiceImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ThingTypesServiceImpl_1.ThingTypesServiceImpl);
});
//# sourceMappingURL=module.js.map