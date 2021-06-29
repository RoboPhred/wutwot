import { Form } from "@wutwot/td";
import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../../things";
import { ThingProperty } from "../types";

export const PropertyFormProvider: Identifier<PropertyFormProvider> =
  createSymbol("PropertyFormProvider");
export interface PropertyFormProvider {
  getPropertyForms(thing: Thing, property: ThingProperty): Form | Form[];
}
