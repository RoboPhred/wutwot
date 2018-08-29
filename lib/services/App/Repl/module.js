"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const ReplServer_1 = require("./ReplServer");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(ReplServer_1.ReplServer);
});
//# sourceMappingURL=module.js.map