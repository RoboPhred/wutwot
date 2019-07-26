import { ReadonlyRecord } from "../../types";

/**
 * Describes the minimum set of unique properties required to create a thing.
 *
 * All other properties present on Thing are derived from other sources,
 * such as capabilities.
 */
export interface ThingDef {
  readonly title: string;
  readonly description: string;
  readonly metadata?: ReadonlyRecord<string, any>;
}
