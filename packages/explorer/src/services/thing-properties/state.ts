import { deepFreeze } from "@/utils/deepFreeze";

import { ThingAndPropertyId, ThingPropertyObservation } from "./types";

export interface ThingPropertiesState {
  observers: Record<string, ThingAndPropertyId[]>;
  observationsByKeyByThing: Record<
    string,
    Record<string, ThingPropertyObservation>
  >;
}

const _defaultState: ThingPropertiesState = {
  observers: {},
  observationsByKeyByThing: {},
};

export const defaultThingPropertiesState = deepFreeze(_defaultState);
