import { ToJSON } from "../../../types";

import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

export interface ThingActionRequest {
  readonly id: string;

  readonly thingId: string;
  readonly actionId: string;

  readonly input: any;

  readonly timeRequested: string;
  readonly timeCompleted: string | null;
  readonly status: ThingActionRequestStatus;

  toJSON(): ToJSON<ThingActionRequest>;
}
