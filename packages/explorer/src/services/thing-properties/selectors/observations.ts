import get from "lodash/get";

import { ThingPropertiesState } from "../state";
import { createThingPropertiesSelector } from "../utils";

export const observationSelector = createThingPropertiesSelector(
  (state: ThingPropertiesState, thingDisplayId: string, propertyId: string) => {
    const value = get(
      state.observationsByKeyByThing,
      [thingDisplayId, propertyId],
      null,
    );
    return value;
  },
);
