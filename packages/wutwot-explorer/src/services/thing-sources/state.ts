import { ThingSource } from "./types";

export interface ThingSourcesState {
  sources: ThingSource[];
}

export const defaultThingSourcesState: Readonly<ThingSourcesState> = Object.freeze(
  {
    sources: [],
  },
);
