import { Identifier } from "microinject";
import createSymbol from "../../../create-symbol";

export const ThingTypeService: Identifier<ThingTypeService> = createSymbol(
  "ThingTypesService"
);
export interface ThingTypeService {
  addType(thingId: string, type: string): void;
  getTypes(thingId: string): string[];
}
