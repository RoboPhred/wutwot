import { Observable } from "rxjs";
import { JSONSchema6 } from "json-schema";

import { makeValidator, makeValidateOrThrow } from "../../../utils/ajv";
import { makeReadOnlyDeep } from "../../../utils/readonly";

import { ThingPropertyType, ThingPropertyTypes } from "./ThingProperty";
import {
  InteractionAffoardanceDef,
  interactionAffoardanceDefSchema,
} from "../../affoardance";

// TODO: This should extend DataSchema
//  or more probably, there should be multiple of these that collectively
//  each extend one of the DataSchema sub types.
export interface ThingPropertyDef extends InteractionAffoardanceDef {
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
    type: { enum: ThingPropertyTypes },
    unit: { type: "string", minLength: 1 },
    enum: { type: "array", items: { type: "string", minLength: 1 } },
    minimum: { type: "number" },
    maximum: { type: "number" },
    multipleOf: { type: "number" },
    readOnly: { type: "boolean" },
    initialValue: { type: ThingPropertyTypes },
  },
  required: ["type", "initialValue"],
});

export const validatePropertyDef = makeValidator(
  interactionAffoardanceDefSchema,
  propertyDefSchema,
);
export const validatePropertyDefOrThrow = makeValidateOrThrow(
  validatePropertyDef,
);
