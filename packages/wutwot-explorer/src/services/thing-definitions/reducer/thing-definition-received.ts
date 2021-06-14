import { AnyAction } from "redux";

import { DCMITermsIRIs } from "@wutwot/td";

import { isThingDefinitionsRecievedAction } from "@/actions/thing-definition-received";

import { fpSet } from "@/utils/fpSet";
import { createId } from "@/utils/id";
import { getExpandedValueOrId } from "@/utils/json-ld";

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

    for (const { definition, expandedDefinition } of definitions) {
      const title = String(
        getExpandedValueOrId(expandedDefinition, DCMITermsIRIs.Title) ??
          "untitled",
      );
      const displayId = createId(
        `${sourceId}--${title.replace(/![a-zA-Z0-9]/g, "")}`,
        Object.keys(state.thingDataByDisplayId),
      );
      state = fpSet(state, "thingDataByDisplayId", displayId, {
        sourceId,
        displayId,
        definition,
        expandedDefinition,
      });
    }

    return state;
  },
);
