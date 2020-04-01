import { ThingEventRecord } from "./ThingEventRecord";

export interface ThingEvent {
  readonly id: string;
  readonly thingId: string;

  readonly ownerPlugin: object;

  readonly title: string;
  readonly semanticType: string;
  readonly description: string;
  readonly type: string;
  readonly unit: string | undefined;
  readonly minimum: number | undefined;
  readonly maximum: number | undefined;
  readonly multipleOf: number | undefined;

  readonly records: readonly ThingEventRecord[];
}
