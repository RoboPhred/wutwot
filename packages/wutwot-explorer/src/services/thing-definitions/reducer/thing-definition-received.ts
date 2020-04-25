import { AnyAction } from "redux";
import { v4 as uuidV4 } from "uuid";

import { isThingDefinitionRecievedAction } from "@/actions/thing-definition-received";
import { fpSet } from "@/utils/fpSet";

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
    if (!isThingDefinitionRecievedAction(action)) {
      return state;
    }

    const { sourceId, definitions } = action.payload;

    for (const definition of definitions) {
      const id = definition.id ?? `uuid:${uuidV4()}`;
      state = fpSet(state, "thingDataByDisplayId", id, {
        sourceId,
        definition,
      });
    }

    return state;
  },
);
