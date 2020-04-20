import { AnyAction } from "redux";

export const INITIALIZE_ACTION = "initialize";

export const initialize = () => ({ type: INITIALIZE_ACTION });
export type InitializeAction = ReturnType<typeof initialize>;
export function isInitializeAction(
  action: AnyAction,
): action is InitializeAction {
  return action.type === INITIALIZE_ACTION;
}
