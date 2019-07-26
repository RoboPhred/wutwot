export interface ThingPropertyDef {
  label: string;
  semanticType?: string;
  description: string;
  type: "null" | "object" | "array" | "number" | "integer" | "string";
  unit: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  readOnly?: boolean;
}
