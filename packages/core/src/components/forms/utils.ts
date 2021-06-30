import { flatMap } from "lodash";
import { ThingAction } from "../actions";
import { ThingProperty } from "../properties";
import { Thing } from "../things";
import { FormProvider } from "./contracts";

export function getPropertyForms(
  providers: FormProvider[],
  thing: Thing,
  property: ThingProperty,
) {
  return flatMap(providers, (provider) => {
    if (!provider.getPropertyForms) {
      return [];
    }
    return provider.getPropertyForms(thing, property);
  });
}

export function getActionForms(
  providers: FormProvider[],
  thing: Thing,
  action: ThingAction,
) {
  return flatMap(providers, (provider) => {
    if (!provider.getActionForms) {
      return [];
    }
    return provider.getActionForms(thing, action);
  });
}
