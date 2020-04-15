import { AnyAction } from "redux";

import { AppState } from "@/state";

export const actionsBlacklist: string[] = [];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return state;
}
