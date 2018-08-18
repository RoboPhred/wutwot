"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const EndpointImpl_1 = require("./impl/EndpointImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(EndpointImpl_1.EndpointImpl);
});
//# sourceMappingURL=module.js.map