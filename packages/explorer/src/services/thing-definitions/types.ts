import { Thing } from "@wutwot/td";

export interface ResolvedThingDefinition {
  definition: Thing;
  rawDefinition: any;
}

export interface ThingData extends ResolvedThingDefinition {
  displayId: string;
  sourceId: string;
}
