import { isThingPropertyUnobserveAction } from "@/actions/thing-property-unobserve";
import omit from "lodash/omit";

import { createThingPropertiesReducer } from "../utils";

export default createThingPropertiesReducer((state, action) => {
  if (!isThingPropertyUnobserveAction(action)) {
    return state;
  }

  const { observerId } = action.payload;

  return {
    ...state,
    observers: omit(state.observers, observerId),
  };
});
