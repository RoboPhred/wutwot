import { createSelector } from "reselect";
import keys from "lodash/keys";
import values from "lodash/values";
import mapValues from "lodash/mapValues";

import { createThingDefinitionsSelector } from "./utils";
import { ThingDefinitionsServiceState } from "./state";
import { ThingWithDisplayId } from "./types";

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

export const thingDefinitionsByIdSelector = createThingDefinitionsSelector(
  createSelector(
    (state: ThingDefinitionsServiceState) => state.thingDataByDisplayId,
    (thingDataByDisplayId) =>
      mapValues(thingDataByDisplayId, (data) => data.definition),
  ),
);

export const thingDefinitionsSelector = createThingDefinitionsSelector(
  createSelector(
    (state: ThingDefinitionsServiceState) => state.thingDataByDisplayId,
    (thingDataByDisplayId) => {
      const things: ThingWithDisplayId[] = [];
      for (const displayId of Object.keys(thingDataByDisplayId)) {
        const thingData = thingDataByDisplayId[displayId];
        things.push({
          ...thingData.definition,
          displayId,
        });
      }
      return things;
    },
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

export const thingDefinitionErrorsSelector = createThingDefinitionsSelector(
  (state) => state.definitionErrorsBySourceId,
);

export const thingDefinitionErrorSelector = createThingDefinitionsSelector(
  (state: ThingDefinitionsServiceState, sourceId: string) => {
    const error = state.definitionErrorsBySourceId[sourceId];
    return error ?? null;
  },
);
