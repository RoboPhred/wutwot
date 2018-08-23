"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IDMapper {
    constructor() {
        this._ids = new Set();
        this._nextRollingPostfix = 1;
    }
    createId(root) {
        let id = root;
        while (this._ids.has(id)) {
            id = `${root}-${this._nextRollingPostfix++}`;
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
exports.IDMapper = IDMapper;
//# sourceMappingURL=IDMapper.js.map