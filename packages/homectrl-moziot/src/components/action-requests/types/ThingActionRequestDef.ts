import { Observable } from "rxjs";

import { ThingActionRequestUpdate } from "./ThingActionRequestUpdate";
import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

export interface ThingActionBaseRequestDef {
  /**
   * The initial status of this request.
   */
  initialStatus: ThingActionRequestStatus;

  /**
   * The user input provided to this request.
   */
  input: any;

  /**
   * The ISO 8601 timestamp this request was created on.
   */
  timeRequested: string;
}

export interface ThingActionInProgressRequestDef
  extends ThingActionBaseRequestDef {
  /**
   * The initial status of this request.
   */
  initialStatus:
    | ThingActionRequestStatus.Started
    | ThingActionRequestStatus.Pending;

  /**
   * A status observable to report on the status of this action request.
   */
  status: Observable<ThingActionRequestUpdate>;
}

export interface ThingActionCompletedRequestDef
  extends ThingActionBaseRequestDef {
  initialStatus: ThingActionRequestStatus.Completed;

  /**
   * The result of this action request.
   */
  output: any;

  /**
   * The ISO 8601 timestamp this request was completed on.
   */
  timeCompleted: string;
}

export interface ThingActionErrorRequestDef extends ThingActionBaseRequestDef {
  initialStatus: ThingActionRequestStatus.Error;

  /**
   * The ISO 8601 timestamp this request was completed on.
   */
  timeCompleted: string;
}

/**
 * Defines the information required to create a {@link ThingActionRequest}.
 */
export type ThingActionRequestDef =
  | ThingActionInProgressRequestDef
  | ThingActionCompletedRequestDef
  | ThingActionErrorRequestDef;
