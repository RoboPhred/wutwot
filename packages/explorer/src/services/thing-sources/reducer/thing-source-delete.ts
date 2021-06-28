import { AnyAction } from "redux";
import pick from "lodash/pick";
import keys from "lodash/keys";

import { isThingSourceDeleteAction } from "@/actions/thing-source-delete";

import { ThingSourcesState, defaultThingSourcesState } from "../state";
import { createThingSourcesReducer } from "../utils";

export default createThingSourcesReducer(
  (state: ThingSourcesState = defaultThingSourcesState, action: AnyAction) => {
    if (!isThingSourceDeleteAction(action)) {
      return state;
    }

    const { id } = action.payload;
    return {
      ...state,
      sourcesById: pick(
        state.sourcesById,
        keys(state.sourcesById).filter((x) => x != id),
      ),
    };
  },
);
