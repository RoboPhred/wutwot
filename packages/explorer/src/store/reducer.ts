import thingDefinitionsReducer from "@/services/thing-definitions/reducer";
import thingPropertiesReducer from "@/services/thing-properties/reducer";
import thingSourcesReducer from "@/services/thing-sources/reducer";

import { finalizeReducerList, concatReducers } from "./utils";

export default finalizeReducerList(
  concatReducers(
    thingDefinitionsReducer,
    thingPropertiesReducer,
    thingSourcesReducer,
  ),
);
