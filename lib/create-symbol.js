"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URN_PREFIX = "https://github.com/robophred/homectrl-server#";
function createSymbol(...name) {
    let flatName = [].concat(...name);
    return Symbol.for(`${URN_PREFIX}${flatName.join(":")}`);
}
exports.default = createSymbol;
//# sourceMappingURL=create-symbol.js.map