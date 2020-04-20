import { AnyAction } from "redux";

import { asArray, MaybeArray } from "@/types";
import { ThingDefinition } from "@/services/thing-definitions/types";

export const THING_DEFINITION_RECEIVED_ACTION = "thing-definition-received" as const;
export const thingDefinitionReceived = (
  sourceUrl: string,
  definition: MaybeArray<ThingDefinition>,
) => ({
  type: THING_DEFINITION_RECEIVED_ACTION,
  payload: { sourceUrl, definitions: asArray(definition) },
});
export type ThingDefinitionReceivedAction = ReturnType<
  typeof thingDefinitionReceived
>;
export function isThingDefinitionRecievedAction(
  action: AnyAction,
): action is ThingDefinitionReceivedAction {
  return action.type === THING_DEFINITION_RECEIVED_ACTION;
}
