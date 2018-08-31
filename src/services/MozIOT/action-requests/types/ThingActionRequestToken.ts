import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

export interface ThingActionRequestToken {
  readonly id: string;
  readonly timeRequested: string;
  readonly input: any;
  readonly status: ThingActionRequestStatus;

  setStatus(status: ThingActionRequestStatus): void;
}
