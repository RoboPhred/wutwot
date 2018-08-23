"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadonlyMapWrapper {
    constructor(_map) {
        this._map = _map;
    }
    forEach(callbackfn, thisArg) {
        this._map.forEach(callbackfn, thisArg);
    }
    get(key) {
        return this._map.get(key);
    }
    has(key) {
        return this._map.has(key);
    }
    get size() {
        return this._map.size;
    }
    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }
    entries() {
        return this._map.entries();
    }
    keys() {
        return this._map.keys();
    }
    values() {
        return this._map.values();
    }
}
exports.ReadonlyMapWrapper = ReadonlyMapWrapper;
//# sourceMappingURL=ReadonlyMapWrapper.js.map