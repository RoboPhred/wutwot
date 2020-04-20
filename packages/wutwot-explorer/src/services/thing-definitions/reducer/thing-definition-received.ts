import { AnyAction } from "redux";

import { isThingDefinitionRecievedAction } from "@/actions/thing-definition-received";

import { createThingDefinitionsReducer } from "../utils";
import {
  ThingDefinitionsServiceState,
  defaultThingDefinitionsServiceState,
} from "../state";
import { fpSet } from "@/utils/fpSet";

export default createThingDefinitionsReducer(
  (
    state: ThingDefinitionsServiceState = defaultThingDefinitionsServiceState,
    action: AnyAction,
  ) => {
    if (!isThingDefinitionRecievedAction(action)) {
      return state;
    }

    const { sourceUrl, definitions } = action.payload;

    for (const definition of definitions) {
      state = fpSet(state, "thingDefinitionsById", definition.id, {
        sourceUrl,
        definition,
      });
    }

    return state;
  },
);
