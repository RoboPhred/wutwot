import { AnyAction } from "redux";

export const THING_SOURCE_ADD_ACTION = "thing-source-add" as const;
export const thingSourceAdd = (name: string, url: string) => ({
  type: THING_SOURCE_ADD_ACTION,
  payload: { name, url },
});
export type ThingSourceAddAction = ReturnType<typeof thingSourceAdd>;
export function isThingSourceAddAction(
  action: AnyAction,
): action is ThingSourceAddAction {
  return action.type === THING_SOURCE_ADD_ACTION;
}
