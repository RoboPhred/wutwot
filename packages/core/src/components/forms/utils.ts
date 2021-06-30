import { flatMap } from "lodash";
import { ThingAction } from "../actions";
import { ThingProperty } from "../properties";
import { ThingEvent } from "../thing-events";
import { Thing } from "../things";
import { FormProvider } from "./contracts";

export function getThingForms(providers: FormProvider[], thing: Thing) {
  return flatMap(providers, (provider) => {
    if (!provider.getThingForms) {
      return [];
    }
    return provider.getThingForms(thing);
  });
}
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

export function getEventForms(
  providers: FormProvider[],
  thing: Thing,
  event: ThingEvent,
) {
  return flatMap(providers, (provider) => {
    if (!provider.getEventForms) {
      return [];
    }
    return provider.getEventForms(thing, event);
  });
}
