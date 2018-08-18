import { ReadonlyRecord } from "../../../../types";
export interface ThingDef {
    readonly thingId: string;
    readonly thingTypes?: string[];
    readonly thingDefaultName?: string;
    readonly thingDefaultDescription?: string;
    readonly thingMetadata?: ReadonlyRecord<string, any>;
}
export interface ThingContext extends ThingDef {
    readonly thingSourceId: string;
    readonly thingSourceThingId: string;
}
