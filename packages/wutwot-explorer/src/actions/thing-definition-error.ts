import { AnyAction } from "redux";

export const THING_DEFINITION_ERROR_ACTION = "thing-definition-error" as const;
export const thingDefinitionError = (
  sourceUrl: string,
  errorMessage: string,
) => ({
  type: THING_DEFINITION_ERROR_ACTION,
  payload: { sourceUrl, errorMessage },
});
export type ThingDefinitionErrorAction = ReturnType<
  typeof thingDefinitionError
>;
export function isThingDefinitionErrorAction(
  action: AnyAction,
): action is ThingDefinitionErrorAction {
  return action.type === THING_DEFINITION_ERROR_ACTION;
}
