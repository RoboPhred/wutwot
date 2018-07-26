"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ThingManagerImpl_1 = require("./impl/ThingManagerImpl");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(ThingManagerImpl_1.ThingManagerImpl);
    });
}
exports.default = createModule;
//# sourceMappingURL=module.js.map