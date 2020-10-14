import { concatReducers } from "@/store/utils";

import thingDefinitionErrorReducer from "./thing-definition-error";
import thingDefinitionReceivedReducer from "./thing-definition-received";
import thingSourceDeleteReducer from "./thing-source-delete";

export default concatReducers(
  thingDefinitionErrorReducer,
  thingDefinitionReceivedReducer,
  thingSourceDeleteReducer,
);
