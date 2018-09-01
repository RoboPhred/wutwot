"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const IdMapperImpl_1 = require("./impl/IdMapperImpl");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(IdMapperImpl_1.IdMapperImpl);
});
//# sourceMappingURL=module.js.map