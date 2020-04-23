import { MaybeArray } from "@/types";

export interface ThingDefinitionData {
  sourceUrl: string;
  definition: ThingDefinition;
}

// TODO: Move to shared library, @wutwot/td
export interface ThingDefinition {
  id: string;
  title?: string;
  description?: string;
  properties?: Record<string, PropertyAffordance>;
}
export interface InteractionAffordance {
  "@type"?: string;
  title?: string;
  description?: string;
  forms: Form[];
  uriVariables?: Record<string, DataSchema>;
}
export type FormOp =
  | "readproperty"
  | "writeproperty"
  | "observeproperty"
  | "unobserveproperty"
  | "invokeaction"
  | "subscribeevent"
  | "unsubscribeevent"
  | "readallproperties"
  | "writeallproperties"
  | "readmultipleproperties"
  | "writemultipleproperties";
export interface Form {
  op?: MaybeArray<FormOp>;
  href: string;
  contentType?: string;
  contentCoding?: string;
  subprotocol?: string;
  security?: MaybeArray<string>;
  scopes?: MaybeArray<string>;
  response?: ExpectedResponse;
}
export interface ExpectedResponse {
  contentType: string;
}
export type PropertyAffordance = NumericPropertyAffordance;
export interface CorePropertyAffordance extends DataSchema {
  observable?: boolean;
}
export type NumericPropertyAffordance = CorePropertyAffordance & NumberSchema;

export interface DataSchema {
  "@type"?: string;
  title?: string;
  description?: string;
  const?: any;
  unit?: string;
  oneOf?: DataSchema[];
  enum: any[];
  readOnly?: boolean;
  writeOnly?: boolean;
  format?: string;
}
export interface NumberSchema {
  type: "number" | "integer";
  minimum?: number;
  maximum?: number;
}

export function isThingDefinition(value: any): value is ThingDefinition {
  // TODO: AJV json-schema validation.
  return typeof value === "object" && typeof value.id === "string";
}

export function validateThingDefinition(value: any) {
  // TODO: AJV json-schema validation.  Return detailed error.
  if (!isThingDefinition(value)) {
    throw new Error("Provided value is not a ThingDefinition");
  }
}
