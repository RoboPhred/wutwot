export interface ThingProperty {
  readonly id: string;
  readonly title: string;
  readonly semanticType: string | undefined;
  readonly description: string;
  readonly type: "null" | "object" | "array" | "number" | "integer" | "string";
  readonly unit: string;
  readonly enum: string[] | undefined;
  readonly minimum: number | undefined;
  readonly maximum: number | undefined;
  readonly multipleOf: number | undefined;
  readonly readOnly: boolean;

  readonly value: any;

  setValue(value: any): void;
}
