import { AnyAction } from "redux";

import { isThingDefinitionsRecievedAction } from "@/actions/thing-definition-received";

import { fpSet } from "@/utils/fpSet";
import { createId } from "@/utils/id";

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
    if (!isThingDefinitionsRecievedAction(action)) {
      return state;
    }

    const { sourceId, definitions } = action.payload;

    for (const { definition, rawDefinition } of definitions) {
      const title = String(definition.title ?? "untitled");
      const displayId = createId(
        `${sourceId}--${title}`,
        Object.keys(state.thingDataByDisplayId),
      );
      state = fpSet(state, "thingDataByDisplayId", displayId, {
        sourceId,
        displayId,
        definition,
        rawDefinition,
      });
    }

    return state;
  },
);
