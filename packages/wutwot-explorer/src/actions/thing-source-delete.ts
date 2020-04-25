import { AnyAction } from "redux";

export const THING_SOURCE_DELETE_ACTION = "thing-source-delete" as const;
export const thingSourceDelete = (id: string) => ({
  type: THING_SOURCE_DELETE_ACTION,
  payload: { id },
});
export type ThingSourceDeleteAction = ReturnType<typeof thingSourceDelete>;
export function isThingSourceDeleteAction(
  action: AnyAction,
): action is ThingSourceDeleteAction {
  return action.type === THING_SOURCE_DELETE_ACTION;
}
