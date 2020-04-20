import { AnyAction } from "redux";
import pick from "lodash/pick";
import entries from "lodash/entries";

import { isThingSourceDeleteAction } from "@/actions/thing-source-delete";

import { createThingDefinitionsReducer } from "../utils";
import {
  ThingDefinitionsServiceState,
  defaultThingDefinitionsServiceState,
} from "../state";

export default createThingDefinitionsReducer(
  (
    state: ThingDefinitionsServiceState = defaultThingDefinitionsServiceState,
    action: AnyAction,
  ) => {
    if (!isThingSourceDeleteAction(action)) {
      return state;
    }

    const { url } = action.payload;

    const keepIds = entries(state.thingDefinitionsById)
      .filter(([id, data]) => data.sourceUrl !== url)
      .map(([id, data]) => id);

    return {
      ...state,
      thingDefinitionsById: pick(state.thingDefinitionsById, keepIds),
    };
  },
);
