import { Thing } from "@wutwot/td";

export interface ResolvedThingDefinition {
  definition: Thing;
  expandedDefinition: any;
}

export interface ThingData extends ResolvedThingDefinition {
  displayId: string;
  sourceId: string;
}
