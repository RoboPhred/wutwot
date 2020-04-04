import { ThingEventRecord } from "./ThingEventRecord";
import { ToJSON } from "../../../types";

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

  toJSON(): ToJSON<ThingEvent>;
}

export type ThingEventType =
  | "null"
  | "object"
  | "array"
  | "number"
  | "integer"
  | "string"
  | "boolean";

export const ThingEventTypes: ThingEventType[] = [
  "null",
  "object",
  "array",
  "number",
  "integer",
  "string",
  "boolean"
];
