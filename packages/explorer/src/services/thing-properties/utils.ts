import {
  createServiceReducerCreator,
  createServiceSelectorCreator,
} from "../utils";

export const createThingPropertiesReducer =
  createServiceReducerCreator("thingProperties");
export const createThingPropertiesSelector =
  createServiceSelectorCreator("thingProperties");
