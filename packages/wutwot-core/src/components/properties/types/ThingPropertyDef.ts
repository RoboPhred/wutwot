import { Observable } from "rxjs";
import { JSONSchema6 } from "json-schema";
import { DataSchemaType, DataSchemaTypes } from "@wutwot/td";

import { makeReadOnlyDeep } from "../../../immutable";

import { makeValidator, makeValidateOrThrow } from "../../json-schema";
import {
  InteractionAffordanceDef,
  interactionAffordanceDefSchema,
} from "../../affordance";

// TODO: This should extend DataSchema
//  or more probably, there should be multiple of these that collectively
//  each extend one of the DataSchema sub types.
export interface ThingPropertyDef extends InteractionAffordanceDef {
  type: DataSchemaType;
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
    type: { enum: DataSchemaTypes },
    unit: { type: "string", minLength: 1 },
    enum: { type: "array", items: { type: "string", minLength: 1 } },
    minimum: { type: "number" },
    maximum: { type: "number" },
    readOnly: { type: "boolean" },
    initialValue: { type: DataSchemaTypes },
  },
  required: ["type", "initialValue"],
});

export const validatePropertyDef = makeValidator(
  interactionAffordanceDefSchema,
  propertyDefSchema,
);
export const validatePropertyDefOrThrow = makeValidateOrThrow(
  validatePropertyDef,
);
