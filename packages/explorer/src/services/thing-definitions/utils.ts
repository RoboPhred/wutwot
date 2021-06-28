import { ThingData } from "./types";

import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../utils";

export const createThingDefinitionsReducer = createServiceReducerCreator(
  "thingDefinitions",
);
export const createThingDefinitionsSelector = createServiceSelectorCreator(
  "thingDefinitions",
);
