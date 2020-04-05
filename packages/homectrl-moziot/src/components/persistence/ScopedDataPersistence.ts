import { JSONPrimitive } from "../../types";

import { DataPersistence, DataStorageKey } from "./types";

export abstract class ScopedDataPersistence implements DataPersistence {
  protected abstract get dataKey(): DataStorageKey;

  constructor(private _parent: DataPersistence) {}

  get(key: DataStorageKey, defaultValue?: any) {
    return this._parent.get([...this.dataKey, ...key], defaultValue);
  }
  set(key: DataStorageKey, value: JSONPrimitive): void {
    return this._parent.set([...this.dataKey, ...key], value);
  }
}
