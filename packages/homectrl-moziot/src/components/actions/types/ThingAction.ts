import { JSONSchema6 } from "json-schema";

import { makeReadOnly, makeReadOnlyDeep } from "../../../utils/readonly";
import { DeepImmutableObject, ToJSON } from "../../../types";

import { ThingActionRequest } from "../../action-requests";

export interface ThingAction {
  readonly id: string;
  readonly thingId: string;
  readonly ownerPlugin: object;
  readonly title: string;
  readonly semanticType: string | undefined;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;

  readonly requests: ReadonlyArray<ThingActionRequest>;
  request(input: any): ThingActionRequest;

  toJSON(): ToJSON<ThingAction>;
}

export const ThingActionKeys = makeReadOnly<(keyof ThingAction)[]>([
  "id",
  "thingId",
  "ownerPlugin",
  "title",
  "semanticType",
  "description",
  "input",
  "requests",
  "request",
  "toJSON"
]);
