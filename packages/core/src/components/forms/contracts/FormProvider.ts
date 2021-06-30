import { Form } from "@wutwot/td";
import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../../things";
import { ThingProperty } from "../../properties";
import { ThingAction } from "../../actions";

export const FormProvider: Identifier<FormProvider> =
  createSymbol("FormProvider");
export interface FormProvider {
  getPropertyForms?(thing: Thing, property: ThingProperty): Form | Form[];
  getActionForms?(thing: Thing, action: ThingAction): Form | Form[];
}
