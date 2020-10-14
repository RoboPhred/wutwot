import { AnyAction } from "redux";

import { isThingDefinitionErrorAction } from "@/actions/thing-definition-error";

import {
  defaultThingDefinitionsServiceState,
  ThingDefinitionsServiceState,
} from "../state";
import { createThingDefinitionsReducer } from "../utils";

export default createThingDefinitionsReducer(
  (
    state: ThingDefinitionsServiceState = defaultThingDefinitionsServiceState,
    action: AnyAction,
  ) => {
    if (!isThingDefinitionErrorAction(action)) {
      return state;
    }

    const { sourceId, errorMessage } = action.payload;

    return {
      ...state,
      definitionErrorsBySourceId: {
        ...state.definitionErrorsBySourceId,
        [sourceId]: errorMessage,
      },
    };
  },
);
