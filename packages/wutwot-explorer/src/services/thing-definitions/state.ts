import { ThingDefinitionData } from "./types";

export interface ThingDefinitionsServiceState {
  thingDefinitionsById: Record<string, ThingDefinitionData>;
}

export const defaultThingDefinitionsServiceState: Readonly<ThingDefinitionsServiceState> = Object.freeze(
  {
    thingDefinitionsById: {},
  },
);
