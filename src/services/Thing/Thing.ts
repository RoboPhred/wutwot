import { ReadonlyRecord } from "../../types";

export interface Thing {
  readonly id: string;
  name: string;
  readonly type: string;
  readonly description: string;

  // readonly properties: ReadonlyRecord<string, ThingProperty>;
  // readonly events: ReadonlyRecord<string, ThingEventDef>;
  readonly actions: ReadonlyRecord<string, ThingAction>;
}

// export interface ThingProperty {
//   readonly label: string;
//   readonly type: string;
//   readonly description: string;
// }

// export interface NumericThingProperty extends ThingProperty {
//   readonly type: "number";
//   readonly unit?: string;
//   readonly minimum?: number;
//   readonly maximum?: number;
// }

// export interface ObjectThingProperty extends ThingProperty {
//   readonly type: "object";
//   readonly properties: ReadonlyRecord<string, ThingProperty>;
// }

export interface ThingAction {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly requests: ReadonlyArray<ThingActionRequest>;
  invoke(input: any): Promise<ThingActionRequest>;
}

export interface ThingActionRequest {
  readonly id: string;
  readonly timeRequested: string;
  readonly status: string;
  cancel(): boolean;
  wait(): Promise<void>;
}

// export interface ThingEventDef {
//   readonly type: string;
//   readonly unit: string;
//   readonly description: string;
// }
