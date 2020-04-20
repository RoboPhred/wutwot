import { concatReducers } from "@/store/utils";

import persistenceReducer from "./persistence";
import thingSourceAddReducer from "./thing-source-add";
import thingSourceDeleteReducer from "./thing-source-delete";

export default concatReducers(
  persistenceReducer,
  thingSourceAddReducer,
  thingSourceDeleteReducer,
);
