import createSymbol from "../../create-symbol";
import { Identifier } from "microinject/dts/interfaces";

export const PropertyValueRegistry: Identifier<
  PropertyValueRegistry
> = createSymbol("PropertyValueRegistry");
export interface PropertyValueRegistry {
  getValue(thingId: string, propertyId: string): any;
  setValue(thingId: string, propertyId: string, value: any): void;
}
