import { JSONSchema6 } from "json-schema";

import { DeepImmutable, ReadonlyRecord } from "../../../../types";

/**
 * A definition of an action to perform.
 */
export interface ThingActionDef {
  readonly actionId: string;
  readonly thingId: string;
  readonly actionLabel: string;
  readonly actionDescription: string;
  readonly actionInput: DeepImmutable<JSONSchema6>;
  readonly actionMetadata: ReadonlyRecord<string, any>;
}

/**
 * A description of an action being performed.
 */
export interface ThingActionRequestDef {
  readonly requestId: string;
  readonly thingId: string;
  readonly actionId: string;
  readonly timeRequested: string;
}
