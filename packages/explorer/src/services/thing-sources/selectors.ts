import { createSelector } from "reselect";
import values from "lodash/values";
import keys from "lodash/keys";
import find from "lodash/find";

import { createId } from "@/utils/id";

import { createThingSourcesSelector } from "./utils";
import { ThingSourcesState } from "./state";

export const thingSourcesSelector = createThingSourcesSelector(
  createSelector(
    (state: ThingSourcesState) => state.sourcesById,
    (sourcesById) => values(sourcesById),
  ),
);

export const thingSourceSelector = createThingSourcesSelector(
  (state: ThingSourcesState, sourceId: string) => state.sourcesById[sourceId],
);

export const thingSourceIdForUrl = createThingSourcesSelector(
  (state: ThingSourcesState, url: string) => {
    const source = find(values(state.sourcesById), (x) => x.url === url);
    if (!source) {
      return null;
    }
    return source.id;
  },
);

export const thingSourceUrlSelector = createThingSourcesSelector(
  (state: ThingSourcesState, sourceId: string) => {
    const source = state.sourcesById[sourceId];
    if (!source) {
      return undefined;
    }
    return source.url;
  },
);

export const thingSourceTitleInUse = createThingSourcesSelector(
  (state: ThingSourcesState, title: string) => {
    const id = createId(title);
    return find(keys(state.sourcesById), (sourceId) => sourceId === id) != null;
  },
);
