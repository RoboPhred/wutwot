import { AnyAction } from "redux";

import { HomeCtrlState, defaultHomeCtrlState } from "../state";

export default function homeCtrlReducer(
  state: HomeCtrlState = defaultHomeCtrlState,
  action: AnyAction
): HomeCtrlState {
  return state;
}
