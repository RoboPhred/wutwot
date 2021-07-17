import { AnyAction } from "redux";

import { ReceivedThingPropertyObservation } from "@/services/thing-properties/types";

export const THING_PROPERTY_OBSERVATIONS_RECEIVED =
  "thing-property-observations-received" as const;
export const thingPropertyObservationsReceived = (
  observations: ReceivedThingPropertyObservation[],
) => ({
  type: THING_PROPERTY_OBSERVATIONS_RECEIVED,
  payload: { observations },
});
export type ThingPropertyObservationsReceivedAction = ReturnType<
  typeof thingPropertyObservationsReceived
>;
export function isThingPropertyObservationsReceivedAction(
  action: AnyAction,
): action is ThingPropertyObservationsReceivedAction {
  return action.type === THING_PROPERTY_OBSERVATIONS_RECEIVED;
}
