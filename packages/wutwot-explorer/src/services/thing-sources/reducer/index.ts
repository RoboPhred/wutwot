import { concatReducers } from "@/store/utils";

import thingSourceAddReducer from "./thing-source-add";
import thingSourceDeleteReducer from "./thing-source-delete";

export default concatReducers(thingSourceAddReducer, thingSourceDeleteReducer);
