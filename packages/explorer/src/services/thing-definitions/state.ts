import { ThingData } from "./types";

export interface ThingDefinitionsServiceState {
  /**
   * Thing data by local id.
   *
   * We need to generate local ids, as things are not required to send us ids.
   */
  thingDataByDisplayId: Record<string, ThingData>;

  /**
   * Definition errors by source id.
   */
  definitionErrorsBySourceId: Record<string, string>;
}

export const defaultThingDefinitionsServiceState: Readonly<ThingDefinitionsServiceState> = Object.freeze(
  {
    thingDataByDisplayId: {},
    definitionErrorsBySourceId: {},
  },
);
