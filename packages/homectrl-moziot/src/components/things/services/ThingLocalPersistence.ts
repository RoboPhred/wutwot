import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { DataPersistence } from "../../persistence";

/**
 * Identifies the ThingLocalPersistence service.
 *
 * The ThingLocalPersistence service persists data on behalf of a specifc {@link Thing}.
 */
export const ThingLocalPersistence: Identifier<ThingLocalPersistence> = createSymbol(
  "ThingLocalPersistence"
);

/**
 * Defines the ThingLocalPersistence service.
 *
 * The ThingLocalPersistence service persists data on behalf of a specifc {@link Thing}.
 */
export interface ThingLocalPersistence extends DataPersistence {}
