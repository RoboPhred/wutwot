import { AnyAction } from "redux";

import { reducerPriority, PRIORITY_PERSIST } from "@/store/priorities";

import { THING_SOURCE_ADD_ACTION } from "@/actions/thing-source-add";
import { THING_SOURCE_DELETE_ACTION } from "@/actions/thing-source-delete";
import { isInitializeAction } from "@/actions/initialize";

import { getPersistedSources, setPersistedSources } from "../persistence";
import { createThingSourcesReducer } from "../utils";
import { ThingSourcesState, defaultThingSourcesState } from "../state";

const PERSIST_TRIGGERS = [THING_SOURCE_ADD_ACTION, THING_SOURCE_DELETE_ACTION];

export default reducerPriority(
  PRIORITY_PERSIST,
  createThingSourcesReducer(
    (
      state: ThingSourcesState = defaultThingSourcesState,
      action: AnyAction,
    ) => {
      if (isInitializeAction(action)) {
        const sources = getPersistedSources();
        return {
          ...state,
          sources,
        };
      }

      if (PERSIST_TRIGGERS.indexOf(action.type) !== -1) {
        setPersistedSources(state.sources);
        return state;
      }

      return state;
    },
  ),
);
