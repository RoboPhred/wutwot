import { createSelector } from "reselect";
import keys from "lodash/keys";
import values from "lodash/values";

import { createThingDefinitionsSelector } from "./utils";
import { ThingDefinitionsServiceState } from "./state";

export const thingIdsSelector = createThingDefinitionsSelector(
  createSelector(
    (state) => state.thingDataByDisplayId,
    (thingDefinitionsById) => keys(thingDefinitionsById),
  ),
);

export const thingDatasSelector = createThingDefinitionsSelector(
  createSelector(
    (state) => state.thingDataByDisplayId,
    (thingDefinitionsById) => values(thingDefinitionsById),
  ),
);

export const thingDataSelector = createThingDefinitionsSelector(
  (state: ThingDefinitionsServiceState, displayId: string) => {
    const data = state.thingDataByDisplayId[displayId];
    return data;
  },
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
