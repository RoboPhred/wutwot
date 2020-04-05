import { injectable, singleton, provides } from "microinject";
import { get, set } from "lodash";
import { resolve as pathResolve } from "path";
import { writeFileSync, readFileSync } from "fs";

import { JSONPrimitive } from "../../../types";
import { Shutdownable } from "../../../contracts";

import { Database } from "../services";
import { DataStorageKey } from "../types";

@injectable()
@singleton()
@provides(Database)
@provides(Shutdownable)
export class DatabaseImpl implements Database, Shutdownable {
  private _data: any;

  constructor() {
    // TODO: Log load or json parse errors.

    let dataStr: string;
    try {
      dataStr = readFileSync(this.filePath, "utf-8");
    } catch (e) {
      if (e.code === "ENOENT") {
        this._data = {};
        return;
      }

      throw e;
    }

    this._data = JSON.parse(dataStr);
  }

  // TODO: make configurable
  private get filePath() {
    return pathResolve(process.cwd(), "moziot.persistence.json");
  }

  get<T>(key: DataStorageKey): T | undefined;
  get<T>(key: DataStorageKey, defaultValue: T): T;
  get(key: DataStorageKey, defaultValue?: any): any {
    return get(this._data, key, defaultValue);
  }

  set(key: DataStorageKey, value: JSONPrimitive) {
    set(this._data, key, value);

    // TODO: Batch saves on a delay.
    this._save();
  }

  save(): Promise<void> {
    return Promise.resolve();
  }

  onShutdown() {
    return this.save();
  }

  private _save() {
    writeFileSync(this.filePath, JSON.stringify(this._data, null, 2));
  }
}
