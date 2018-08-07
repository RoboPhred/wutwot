"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMethodDecorator(method) {
    return function (path) {
        return function (target, propertyKey, descriptor) { };
    };
}
exports.get = createMethodDecorator("get");
exports.head = createMethodDecorator("head");
exports.post = createMethodDecorator("post");
exports.put = createMethodDecorator("put");
exports.del = createMethodDecorator("delete");
exports.opts = createMethodDecorator("options");
exports.trace = createMethodDecorator("trace");
exports.patch = createMethodDecorator("patch");
//# sourceMappingURL=methods.js.map