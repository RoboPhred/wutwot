import {
  defaultThingSourcesState,
  ThingSourcesState,
} from "@/services/thing-sources/state";

export interface AppState {
  services: {
    thingSources: ThingSourcesState;
  };
}

export const defaultAppState: Readonly<AppState> = Object.freeze({
  services: {
    thingSources: defaultThingSourcesState,
  },
});
