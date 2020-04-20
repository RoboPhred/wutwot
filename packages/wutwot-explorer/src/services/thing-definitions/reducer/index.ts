import { concatReducers } from "@/store/utils";

import thingDefinitionReceivedReducer from "./thing-definition-received";
import thingSourceDeleteReducer from "./thing-source-delete";

export default concatReducers(
  thingDefinitionReceivedReducer,
  thingSourceDeleteReducer,
);
