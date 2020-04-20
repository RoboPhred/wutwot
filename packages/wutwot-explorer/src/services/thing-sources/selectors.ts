import { createThingSourcesSelector } from "./utils";

export const thingSourcesSelector = createThingSourcesSelector(
  (state) => state.sources,
);
