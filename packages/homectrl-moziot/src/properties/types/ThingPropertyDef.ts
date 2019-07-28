export interface ThingPropertyDef {
  title: string;
  semanticType?: string;
  description: string;
  type: "null" | "object" | "array" | "number" | "integer" | "string";
  unit?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  readOnly?: boolean;

  initialValue: any;

  onValueChangeRequested(thingId: string, propertyId: string, value: any): void;
}
