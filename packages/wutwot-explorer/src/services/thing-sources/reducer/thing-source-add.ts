import { AnyAction } from "redux";

import { isThingSourceAddAction } from "@/actions/thing-source-add";
import { fpSet } from "@/utils/fpSet";
import { stripId } from "@/utils/id";

import { ThingSourcesState, defaultThingSourcesState } from "../state";
import { createThingSourcesReducer } from "../utils";

export default createThingSourcesReducer(
  (state: ThingSourcesState = defaultThingSourcesState, action: AnyAction) => {
    if (!isThingSourceAddAction(action)) {
      return state;
    }

    const { title, url } = action.payload;
    const id = stripId(name);
    if (state.sourcesById[id]) {
      return state;
    }

    return fpSet(state, "sourcesById", id, { id, title, url });
  },
);
