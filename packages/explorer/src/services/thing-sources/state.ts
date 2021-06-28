import { ThingSource } from "./types";

export interface ThingSourcesState {
  sourcesById: Record<string, ThingSource>;
}

export const defaultThingSourcesState: Readonly<ThingSourcesState> = Object.freeze(
  {
    sourcesById: {},
  },
);
