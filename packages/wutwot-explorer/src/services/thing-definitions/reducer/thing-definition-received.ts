import { AnyAction } from "redux";
import { v4 as uuidV4 } from "uuid";

import { isThingDefinitionRecievedAction } from "@/actions/thing-definition-received";
import { fpSet } from "@/utils/fpSet";

import { createThingDefinitionsReducer } from "../utils";
import {
  ThingDefinitionsServiceState,
  defaultThingDefinitionsServiceState,
} from "../state";
import { createId } from "@/utils/id";

export default createThingDefinitionsReducer(
  (
    state: ThingDefinitionsServiceState = defaultThingDefinitionsServiceState,
    action: AnyAction,
  ) => {
    if (!isThingDefinitionRecievedAction(action)) {
      return state;
    }

    const { sourceId, definitions } = action.payload;

    for (let i = 0; i < definitions.length; i++) {
      const definition = definitions[i];
      const displayId = createId(`${sourceId}-${definition.title}`);
      state = fpSet(state, "thingDataByDisplayId", displayId, {
        displayId,
        sourceId,
        definition,
      });
    }

    return state;
  },
);
