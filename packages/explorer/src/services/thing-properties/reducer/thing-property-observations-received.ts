import { isThingPropertyObservationsReceivedAction } from "@/actions/thing-property-observations-received";
import { fpSet } from "@/utils/fpSet";

import { createThingPropertiesReducer } from "../utils";

export default createThingPropertiesReducer((state, action) => {
  if (!isThingPropertyObservationsReceivedAction(action)) {
    return state;
  }

  const { observations } = action.payload;

  for (const observation of observations) {
    const { thingDisplayId, propertyKey, ...observed } = observation;
    state = fpSet(
      state,
      "observationsByKeyByThing",
      observation.thingDisplayId,
      observation.propertyKey,
      observed,
    );
  }

  return state;
});
