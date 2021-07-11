import { Thing } from "@wutwot/w3c-td";

export interface ResolvedThingDefinition {
  definition: Thing;
  rawDefinition: any;
}

export interface ThingData extends ResolvedThingDefinition {
  displayId: string;
  sourceId: string;
}
