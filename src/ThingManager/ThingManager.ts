import { ThingDef } from "./ThingDefinition";

export interface ThingManager {
  getThings(): ThingDef[];
}
