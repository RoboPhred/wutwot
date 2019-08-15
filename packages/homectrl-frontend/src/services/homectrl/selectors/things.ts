import { AppState } from "@/state";
import { createSelector } from "reselect";

export const thingsByIdSelector = (state: AppState) =>
  state.services.homectrl.thingsById;

export const thingsSelector = createSelector(
  thingsByIdSelector,
  thingsById => Object.keys(thingsById).map(x => thingsById[x])
);
