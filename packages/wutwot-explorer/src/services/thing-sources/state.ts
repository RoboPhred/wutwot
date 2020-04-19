export interface ThingSourcesState {
  sourceUrls: string[];
}

export const defaultThingSourcesState: Readonly<ThingSourcesState> = Object.freeze(
  {
    sourceUrls: [],
  },
);
