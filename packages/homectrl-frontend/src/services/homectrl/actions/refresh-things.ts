import { createStandardAction } from "typesafe-actions";

export const refreshThings = createStandardAction("homectrl/refresh-things")<
  void
>();
export type RefreshThingsAction = ReturnType<typeof refreshThings>;
