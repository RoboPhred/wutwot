import { Identifier } from "microinject";
import createSymbol from "../../../create-symbol";

export const ThingTypesService: Identifier<ThingTypesService> = createSymbol(
  "ThingTypesService"
);
export interface ThingTypesService {
  addType(thingId: string, type: string): void;
  getTypes(thingId: string): string[];
}
