import { AnyAction } from "redux";

import { isThingSourceDeleteAction } from "@/actions/thing-source-delete";

import { ThingSourcesState, defaultThingSourcesState } from "../state";
import { createThingSourcesReducer } from "../utils";

export default createThingSourcesReducer(
  (state: ThingSourcesState = defaultThingSourcesState, action: AnyAction) => {
    if (!isThingSourceDeleteAction(action)) {
      return state;
    }

    const { url } = action.payload;
    return {
      ...state,
      sources: state.sources.filter((x) => x.url !== url),
    };
  },
);
