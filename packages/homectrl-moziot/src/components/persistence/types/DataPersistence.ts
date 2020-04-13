import { JSONPrimitive } from "../../../types";

import { DataPersistenceKey } from "./DataPersistenceKey";

export interface DataPersistence {
  /**
   * Gets the value represented by the key, if any is set.
   * @param key The key to look up data by.
   * @returns The retrieved data, or `undefined`.
   */
  get<T>(key: DataPersistenceKey): T | undefined;

  /**
   * Gets the value represented by the key, or returns a default.
   * @param key The key to look up data by.
   * @param defaultValue The default value to return if no data exists by the specified key.
   * @returns The retrieved data, or the default value.
   */
  get<T>(key: DataPersistenceKey, defaultValue: T): T;

  /**
   * Sets a value into data storage.
   * @param key The key to set data at.
   * @param value The data to set.
   */
  set(key: DataPersistenceKey, value: JSONPrimitive | object): void;
}
