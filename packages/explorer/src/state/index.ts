import {
  ThingDefinitionsServiceState,
  defaultThingDefinitionsServiceState,
} from "@/services/thing-definitions/state";
import {
  ThingPropertiesState,
  defaultThingPropertiesState,
} from "@/services/thing-properties/state";
import {
  defaultThingSourcesState,
  ThingSourcesState,
} from "@/services/thing-sources/state";

export interface AppState {
  services: {
    thingDefinitions: ThingDefinitionsServiceState;
    thingProperties: ThingPropertiesState;
    thingSources: ThingSourcesState;
  };
}

export const defaultAppState: Readonly<AppState> = Object.freeze({
  services: {
    thingDefinitions: defaultThingDefinitionsServiceState,
    thingProperties: defaultThingPropertiesState,
    thingSources: defaultThingSourcesState,
  },
});
