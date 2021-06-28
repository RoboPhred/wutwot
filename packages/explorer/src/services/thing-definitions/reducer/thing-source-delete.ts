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

    const { id } = action.payload;

    const keepIds = entries(state.thingDataByDisplayId)
      .filter(([_, data]) => data.sourceId !== id)
      .map(([id, _]) => id);

    return {
      ...state,
      thingDefinitionsById: pick(state.thingDataByDisplayId, keepIds),
    };
  },
);
