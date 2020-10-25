import { ToJSON } from "../../../types";

import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

/**
 * Defines a request made to an action.
 */
export interface ThingActionRequest {
  /**
   * The ID of this request.
   */
  readonly id: string;

  /**
   * The ID of the thing this request was made on.
   */
  readonly thingId: string;

  /**
   * The ID of the action this request was made for.
   */
  readonly actionId: string;

  /**
   * The user provided input to the request.
   */
  readonly input: any;

  /**
   * If status is "completed", the output of the action.
   */
  readonly output: any | null;

  /**
   * The ISO 8601 timestamp this action was requested on.
   */
  readonly timeRequested: string;

  /**
   * If status is "completed", the ISO 8601 timestamp this action
   * was completed on.
   */
  readonly timeCompleted: string | null;

  /**
   * The current status of this request.
   */
  readonly status: ThingActionRequestStatus;

  /**
   * Gets a promise to await the result of the action request.
   */
  toPromise(): Promise<any>;

  /**
   * Returns a JSON representation of this action request.
   */
  toJSON(): ToJSON<ThingActionRequest>;
}
