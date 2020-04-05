import { Observable } from "rxjs";

import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

/**
 * Defines the information required to create a {@link ThingActionRequest}.
 */
export interface ThingActionRequestDef {
  /**
   * The user input provided to this request.
   */
  input: any;

  /**
   * The ISO 8601 timestamp this request was created on.
   */
  timeRequested: string;

  /**
   * A status observable to report on the status of this action request.
   */
  status: Observable<ThingActionRequestStatus>;
}

// TODO: Since ThingActionRequestDef can be used to create in-progress
//  requests, ThingActionRequestDef should have an initialStatus value.
