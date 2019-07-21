import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../types";

import { ThingActionRequest } from "../../action-requests";

export interface ThingAction {
  readonly id: string;
  readonly thingId: string;
  readonly ownerPlugin: object;
  readonly label: string;
  readonly type: string | undefined;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;

  readonly requests: ReadonlyArray<ThingActionRequest>;
  request(input: any): ThingActionRequest;
}
