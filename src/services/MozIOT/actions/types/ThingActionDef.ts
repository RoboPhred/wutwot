import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../../../types";
import { ThingActionRequestToken } from "./ThingActionRequestToken";

export interface ThingActionDef {
  readonly ["@type"]?: string;
  readonly label: string;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;
  request(input: any, token: ThingActionRequestToken): void;
}
