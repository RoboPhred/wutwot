import { AnyAction } from "redux";

import { isThingSourceAddAction } from "@/actions/thing-source-add";

import { ThingSourcesState, defaultThingSourcesState } from "../state";
import { createThingSourcesReducer } from "../utils";

export default createThingSourcesReducer(
  (state: ThingSourcesState = defaultThingSourcesState, action: AnyAction) => {
    if (!isThingSourceAddAction(action)) {
      return state;
    }

    const { name, url } = action.payload;
    return {
      ...state,
      sources: [...state.sources, { name, url }],
    };
  },
);
