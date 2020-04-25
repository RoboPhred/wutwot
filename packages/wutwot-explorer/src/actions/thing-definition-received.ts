import { AnyAction } from "redux";
import { Thing } from "@wutwot/td";

import { asArray, MaybeArray } from "@/types";

export const THING_DEFINITION_RECEIVED_ACTION = "thing-definition-received" as const;
export const thingDefinitionReceived = (
  sourceId: string,
  definition: MaybeArray<Thing>,
) => ({
  type: THING_DEFINITION_RECEIVED_ACTION,
  payload: { sourceId, definitions: asArray(definition) },
});
export type ThingDefinitionReceivedAction = ReturnType<
  typeof thingDefinitionReceived
>;
export function isThingDefinitionRecievedAction(
  action: AnyAction,
): action is ThingDefinitionReceivedAction {
  return action.type === THING_DEFINITION_RECEIVED_ACTION;
}
