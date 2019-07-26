import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../types";

import { ThingActionRequestToken } from "../../action-requests";

export interface ThingActionDef {
  readonly title: string;
  readonly semanticType?: string;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;
  request(input: any, token: ThingActionRequestToken): void;
}
