"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const IdMapper_1 = require("../IdMapper");
let IdMapperImpl = class IdMapperImpl {
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
};
IdMapperImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(IdMapper_1.IdMapper)
], IdMapperImpl);
exports.IdMapperImpl = IdMapperImpl;
function cleanName(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
}
//# sourceMappingURL=IdMapperImpl.js.map