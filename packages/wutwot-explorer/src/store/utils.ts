import { AnyAction } from "redux";
import sortBy from "lodash/sortBy";

import { MaybeArray } from "@/types";
import { AppState, defaultAppState } from "@/state";

import { AppReducer } from "./types";

export function concatReducers(
  ...reducers: MaybeArray<AppReducer>[]
): AppReducer[] {
  return ([] as AppReducer[]).concat(...reducers);
}

export function finalizeReducerList(reducers: AppReducer[]): AppReducer {
  // Order the list by weight ascending.
  const finalizedList = sortBy(reducers, (x: AppReducer) => x.weight || 0);

  return (state: AppState = defaultAppState, action: AnyAction) => {
    return finalizedList.reduce(
      (state, reducer) => reducer(state, action),
      state,
    );
  };
}
