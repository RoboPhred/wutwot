import { JSONPrimitive } from "../../types";

import { DataPersistence, DataPersistenceKey } from "./types";

export abstract class ScopedDataPersistence implements DataPersistence {
  protected abstract get dataKey(): DataPersistenceKey;

  constructor(private _parent: DataPersistence) {}

  get(key: DataPersistenceKey, defaultValue?: any) {
    return this._parent.get([...this.dataKey, ...key], defaultValue);
  }
  set(key: DataPersistenceKey, value: JSONPrimitive): void {
    return this._parent.set([...this.dataKey, ...key], value);
  }
}
