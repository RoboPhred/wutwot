import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/types";
import { ResolvedThingDefinition } from "@/services/thing-definitions/types";

export const THING_DEFITNITION_RECEIVED_ACTION =
  "thing-definition-received" as const;
export const thingDefinitionsReceived = (
  sourceId: string,
  definitions: MaybeArray<ResolvedThingDefinition>,
) => ({
  type: THING_DEFITNITION_RECEIVED_ACTION,
  payload: { sourceId, definitions: asArray(definitions) },
});
export type ThingDefinitionsReceivedAction = ReturnType<
  typeof thingDefinitionsReceived
>;
export function isThingDefinitionsRecievedAction(
  action: AnyAction,
): action is ThingDefinitionsReceivedAction {
  return action.type === THING_DEFITNITION_RECEIVED_ACTION;
}
