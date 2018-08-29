"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const contracts_1 = require("./contracts");
const MozIot_1 = require("../MozIot");
const Repl_1 = require("./Repl");
const Endpoint_1 = require("./Endpoint");
exports.default = new microinject_1.ContainerModule(bind => {
    bind(contracts_1.Entrypoint).to(Repl_1.ReplServer);
    bind(contracts_1.Entrypoint).to(Endpoint_1.Endpoint);
    // TODO: use toSelf() with next microinject release.
    const mozIot = new MozIot_1.MozIot();
    bind(MozIot_1.MozIot).toConstantValue(mozIot);
});
//# sourceMappingURL=module.js.map