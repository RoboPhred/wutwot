import { ThingSource } from "./ThingSource";
import { ReadonlyRecord } from "../../../../types";

export interface ThingDef {
  readonly thingId: string;
  readonly thingTypes?: string[];
  readonly thingDefaultName?: string;
  readonly thingDefaultDescription?: string;
  readonly metadata?: ReadonlyRecord<string, any>;
}

export interface ThingContext extends ThingDef {
  readonly thingOwner: ThingSource;
  readonly thingOwnerThingId: string;
  readonly metadata: Record<string, any>;
}
