import { createSelector } from "reselect";
import values from "lodash/values";
import keys from "lodash/keys";
import find from "lodash/find";

import { createThingSourcesSelector } from "./utils";
import { ThingSourcesState } from "./state";
import { stripId } from "@/utils/id";

export const thingSourcesSelector = createThingSourcesSelector(
  createSelector(
    (state: ThingSourcesState) => state.sourcesById,
    (sourcesById) => values(sourcesById),
  ),
);

export const thingSourceTitleInUse = createThingSourcesSelector(
  (state: ThingSourcesState, title: string) => {
    const id = stripId(title);
    return find(keys(state.sourcesById), (sourceId) => sourceId === id) != null;
  },
);
