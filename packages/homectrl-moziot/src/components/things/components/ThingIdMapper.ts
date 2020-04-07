import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { IdMapper } from "../../id-mapping";

/**
 * Identifies the ThingIdMapper service.
 *
 * The ThingIdMapper service tracks persistent IDs for {@link Thing}s.
 */
export const ThingIdMapper: Identifier<IdMapper> = createSymbol(
  "ThingIdMapper",
);
export type ThingIdMapper = IdMapper;
