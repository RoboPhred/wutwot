import { createSelector } from "reselect";
import keys from "lodash/keys";

import { createThingDefinitionsSelector } from "./utils";
import { ThingDefinitionsServiceState } from "./state";

export const thingIdsSelector = createThingDefinitionsSelector(
  createSelector(
    (state) => state.thingDefinitionsById,
    (thingDefinitionsById) => keys(thingDefinitionsById),
  ),
);

export const thingDefinitionSelector = createThingDefinitionsSelector(
  (state: ThingDefinitionsServiceState, thingId: string) => {
    const data = state.thingDefinitionsById[thingId];
    if (!data) {
      return null;
    }
    return data.definition;
  },
);
