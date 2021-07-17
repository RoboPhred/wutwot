import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/types";
import { ThingAndPropertyId } from "@/services/thing-properties/types";

export const THING_PROPERTY_OBSERVE_ACTION = "thing-property-observe" as const;
export const observeThingProperty = (
  observerId: string,
  observedProperties: MaybeArray<ThingAndPropertyId>,
) => ({
  type: THING_PROPERTY_OBSERVE_ACTION,
  payload: { observerId, observedProperties: asArray(observedProperties) },
});
export type ThingPropertyObserveAction = ReturnType<
  typeof observeThingProperty
>;
export function isThingPropertyObserveAction(
  action: AnyAction,
): action is ThingPropertyObserveAction {
  return action.type === THING_PROPERTY_OBSERVE_ACTION;
}
