import {
  ThingDefinitionsServiceState,
  defaultThingDefinitionsServiceState,
} from "@/services/thing-definitions/state";
import {
  defaultThingSourcesState,
  ThingSourcesState,
} from "@/services/thing-sources/state";

export interface AppState {
  services: {
    thingDefinitions: ThingDefinitionsServiceState;
    thingSources: ThingSourcesState;
  };
}

export const defaultAppState: Readonly<AppState> = Object.freeze({
  services: {
    thingDefinitions: defaultThingDefinitionsServiceState,
    thingSources: defaultThingSourcesState,
  },
});
