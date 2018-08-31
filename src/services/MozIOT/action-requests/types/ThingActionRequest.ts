import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

export interface ThingActionRequest {
  readonly id: string;
  readonly timeRequested: string;
  readonly input: any;
  readonly status: ThingActionRequestStatus;
}
