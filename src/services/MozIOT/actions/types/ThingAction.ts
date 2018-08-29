import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../../../types";

export interface ThingAction {
  readonly id: string;
  readonly thingId: string;
  readonly ownerPlugin: object;
  readonly label: string;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;
  request(input: any): void;
}
