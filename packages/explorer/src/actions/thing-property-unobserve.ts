import { AnyAction } from "redux";

export const THING_PROPERTY_UNOBSERVE_ACTION =
  "thing-property-unobserve" as const;
export const unobserveThingProperty = (observerId: string) => ({
  type: THING_PROPERTY_UNOBSERVE_ACTION,
  payload: { observerId },
});
export type ThingPropertyUnobserveAction = ReturnType<
  typeof unobserveThingProperty
>;
export function isThingPropertyUnobserveAction(
  action: AnyAction,
): action is ThingPropertyUnobserveAction {
  return action.type === THING_PROPERTY_UNOBSERVE_ACTION;
}
