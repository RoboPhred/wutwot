import { isThingPropertyObserveAction } from "@/actions/thing-property-observe";
import { fpSet } from "@/utils/fpSet";

import { createThingPropertiesReducer } from "../utils";

export default createThingPropertiesReducer((state, action) => {
  if (!isThingPropertyObserveAction(action)) {
    return state;
  }

  const { observerId, observedProperties } = action.payload;

  return fpSet(state, "observers", observerId, observedProperties);
});
