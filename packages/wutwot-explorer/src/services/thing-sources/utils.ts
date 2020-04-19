import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../utils";

export const createThingSourcesReducer = createServiceReducerCreator(
  "thingSources",
);
export const createThingSourcesSelector = createServiceSelectorCreator(
  "thingSources",
);
