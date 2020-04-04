import { Observable } from "rxjs";
import { JSONSchema6 } from "json-schema";

import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";
import { makeReadOnlyDeep } from "../../../utils/readonly";

import { ThingPropertyType, ThingPropertyTypes } from "./ThingProperty";

export interface ThingPropertyDef {
  title: string;
  semanticType?: string;
  description: string;
  type: ThingPropertyType;
  unit?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  readOnly?: boolean;

  initialValue: any;

  values: Observable<any>;

  onValueChangeRequested(thingId: string, propertyId: string, value: any): void;
}

export const propertyDefSchema = makeReadOnlyDeep<JSONSchema6>({
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    semanticType: { type: "string", minLength: 1 },
    description: { type: "string" },
    type: { enum: ThingPropertyTypes },
    unit: { type: "string", minLength: 1 },
    enum: { type: "array", items: { type: "string", minLength: 1 } },
    minimum: { type: "number" },
    maximum: { type: "number" },
    multipleOf: { type: "number" },
    readOnly: { type: "boolean" },
    initialValue: { type: ThingPropertyTypes }
  },
  required: ["title", "description", "type", "initialValue"]
});

export const validatePropertyDef = makeValidator(propertyDefSchema);
export const validatePropertyDefOrThrow = makeValidateOrThrow(
  validatePropertyDef
);
