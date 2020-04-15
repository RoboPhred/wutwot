import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { DataPersistence } from "../types";

/**
 * Identifies the Database service.
 *
 * The Database service stores data across program restarts.
 */
export const Database: Identifier<Database> = createSymbol("Database");

/**
 * Defines the Database service.
 *
 * The Database service stores data across program restarts.
 */
export interface Database extends DataPersistence {
  /**
   * Persists the data.
   */
  save(): Promise<void>;
}
