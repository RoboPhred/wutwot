import { keyBy } from "lodash";
import { createReducer } from "typesafe-actions";

import { defaultHomeCtrlState, HomeCtrlState } from "../state";
import {
  receiveThingsBegin,
  receiveThingsSuccess,
  ReceiveThingsAction,
  receiveThingsError
} from "../actions/receive-things";

const counterReducer = createReducer<HomeCtrlState, ReceiveThingsAction>(
  defaultHomeCtrlState
)
  .handleAction(receiveThingsBegin, state => ({
    ...state,
    isRefreshing: true
  }))
  .handleAction(receiveThingsSuccess, (state, action) => ({
    ...state,
    isRefreshing: false,
    thingsById: keyBy(action.payload, "id")
  }))
  .handleAction(receiveThingsError, (state, action) => ({
    ...state,
    isRefreshing: false,
    errorMessage: action.payload
  }));

export default counterReducer;
