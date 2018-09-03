"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdMapper {
    constructor() {
        this._ids = new Set();
        this._nextRollingPostfix = 1;
    }
    createId(name) {
        let id = cleanName(name);
        while (this._ids.has(id)) {
            id = `${name}-${this._nextRollingPostfix++}`;
        }
        return id;
    }
    retireId(id) {
        return this._ids.delete(id);
    }
    [Symbol.iterator]() {
        return this._ids[Symbol.iterator]();
    }
    has(id) {
        return this._ids.has(id);
    }
}
exports.IdMapper = IdMapper;
function cleanName(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
}
//# sourceMappingURL=IdMapper.js.map