import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return state;
}
