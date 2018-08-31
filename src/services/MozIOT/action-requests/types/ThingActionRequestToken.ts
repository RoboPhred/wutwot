import { ThingActionRequestStatus } from "./ThingActionRequestStatus";
import { ThingActionRequest } from "./ThingActionRequest";

export interface ThingActionRequestToken extends ThingActionRequest {
  setStatus(status: ThingActionRequestStatus): void;
}
