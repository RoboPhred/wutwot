export interface ThingDefinitionData {
  sourceUrl: string;
  definition: ThingDefinition;
}

export interface ThingDefinition {
  id: string;
  title: string;
  description?: string;
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
