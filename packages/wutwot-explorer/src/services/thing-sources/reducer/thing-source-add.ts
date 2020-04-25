import { AnyAction } from "redux";

import { isThingSourceAddAction } from "@/actions/thing-source-add";
import { fpSet } from "@/utils/fpSet";
import { createId } from "@/utils/id";

import { ThingSourcesState, defaultThingSourcesState } from "../state";
import { createThingSourcesReducer } from "../utils";

export default createThingSourcesReducer(
  (state: ThingSourcesState = defaultThingSourcesState, action: AnyAction) => {
    if (!isThingSourceAddAction(action)) {
      return state;
    }

    const { title, url } = action.payload;
    const id = createId(title);
    // We do not allow conflicting titles in sources.  If the id matches, ignore it.
    if (state.sourcesById[id]) {
      return state;
    }

    return fpSet(state, "sourcesById", id, { id, title, url });
  },
);
