import { Form } from "@wutwot/td";
import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { Thing } from "../../things";
import { ThingProperty } from "../../properties";
import { ThingAction } from "../../actions";
import { ThingEvent } from "../../thing-events";

export const FormProvider: Identifier<FormProvider> =
  createSymbol("FormProvider");
export interface FormProvider {
  getThingForms?(thing: Thing): Form | Form[];
  getPropertyForms?(thing: Thing, property: ThingProperty): Form | Form[];
  getActionForms?(thing: Thing, action: ThingAction): Form | Form[];
  getEventForms?(thing: Thing, event: ThingEvent): Form | Form[];
}
