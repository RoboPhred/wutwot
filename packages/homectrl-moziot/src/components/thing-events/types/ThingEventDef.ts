import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";

import { makeReadOnlyDeep } from "../../../utils/readonly";
import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";

import { ThingEventTypes, ThingEventType } from "./ThingEvent";

export interface ThingEventDef {
  title: string;
  semanticType: string;
  description: string;
  type: ThingEventType;
  unit?: string;
  minimum?: number;
  maximum?: number;
  multipleOf?: number;

  eventSource: Observable<any>;
}

export const eventDefSchema = makeReadOnlyDeep<JSONSchema6>({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    semanticType: { type: "string", minLength: 1 },
    description: { type: "string" },
    type: { enum: ThingEventTypes },
    unit: { type: "string", minLength: 1 },
    enum: { type: "array", items: { type: "string", minLength: 1 } },
    minimum: { type: "number" },
    maximum: { type: "number" },
    multipleOf: { type: "number" }
  },
  required: ["title", "description", "type"]
});

export const validateEventDef = makeValidator(eventDefSchema);
export const validateEventDefOrThrow = makeValidateOrThrow(validateEventDef);
