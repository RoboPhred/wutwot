import { createSelector } from "reselect";
import keys from "lodash/keys";

import { createThingDefinitionsSelector } from "./utils";
import { ThingDefinitionsServiceState } from "./state";

export const thingIdsSelector = createThingDefinitionsSelector(
  createSelector(
    (state) => state.thingDataByDisplayId,
    (thingDefinitionsById) => keys(thingDefinitionsById),
  ),
);

export const thingDefinitionSelector = createThingDefinitionsSelector(
  (state: ThingDefinitionsServiceState, displayId: string) => {
    const data = state.thingDataByDisplayId[displayId];
    if (!data) {
      return null;
    }
    return data.definition;
  },
);
