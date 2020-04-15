import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

export interface ThingActionRequestUpdateBase {
  status: ThingActionRequestStatus;
}

export interface ThingActionRequestStartedUpdate {
  status: ThingActionRequestStatus.Started;
}
function requestStarted(): ThingActionRequestStartedUpdate {
  return { status: ThingActionRequestStatus.Started };
}

export interface ThingActionRequestCancelledUpdate {
  status: ThingActionRequestStatus.Cancelled;
}
function requestCancelled(): ThingActionRequestCancelledUpdate {
  return { status: ThingActionRequestStatus.Cancelled };
}

export interface ThingActionRequestCompletedUpdate {
  status: ThingActionRequestStatus.Completed;
  output: any;
}
function requestCompleted(output?: any): ThingActionRequestCompletedUpdate {
  return { status: ThingActionRequestStatus.Completed, output };
}

interface ThingActionRequestErrorUpdate {
  status: ThingActionRequestStatus.Error;
  // TODO: Does error produce output?
}
function requestError(): ThingActionRequestErrorUpdate {
  return { status: ThingActionRequestStatus.Error };
}

export type ThingActionRequestUpdate =
  | ThingActionRequestStartedUpdate
  | ThingActionRequestCancelledUpdate
  | ThingActionRequestCompletedUpdate
  | ThingActionRequestErrorUpdate;

export namespace ThingActionRequestUpdate {
  export const started = requestStarted;
  export const cancelled = requestCancelled;
  export const completed = requestCompleted;
  export const error = requestError;
}
