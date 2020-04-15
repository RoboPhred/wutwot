import { combineReducers, AnyAction } from "redux";

import homeeCtrlReducer from "@/services/homectrl/reducer";
import { AppState, defaultAppState } from "@/state";

const servicesReducer = combineReducers({
  homectrl: homeeCtrlReducer
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    ...state,
    services: servicesReducer(state.services, action)
  };
}
