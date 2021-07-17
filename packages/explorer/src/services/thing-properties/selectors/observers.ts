import values from "lodash/values";
import flatten from "lodash/flatten";
import { ThingAndPropertyId } from "../types";

import { createThingPropertiesSelector } from "../utils";

export const observedPropertiesSelector = createThingPropertiesSelector(
  (state) => {
    let observed: ThingAndPropertyId[] = [];
    const checked = new Set<string>();
    for (const value of flatten(values(state.observers))) {
      const key = `${value.thingDisplayId}:${value.propertyKey}`;
      if (checked.has(key)) {
        continue;
      }
      observed.push(value);
    }

    return observed;
  },
);
