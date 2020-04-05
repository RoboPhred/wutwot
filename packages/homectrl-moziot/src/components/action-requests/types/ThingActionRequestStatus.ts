/**
 * Defines the available statuses an action request can be in.
 */
export enum ThingActionRequestStatus {
  Pending = "pending",
  Started = "started",
  Completed = "completed",
  Cancelled = "cancelled",
  Error = "error"
}

export namespace ThingActionRequestStatus {
  /**
   * Check to see if the given status is a final status.
   *
   * Final statuses cannot be changed once set.
   * @param status The status to check.
   * @returns `true` if the status is a final status.
   */
  export function isFinalStatus(status: ThingActionRequestStatus) {
    switch (status) {
      case ThingActionRequestStatus.Cancelled:
      case ThingActionRequestStatus.Completed:
      case ThingActionRequestStatus.Error:
        return true;
      default:
        return false;
    }
  }

  /**
   * Check to see if it is valid to transition from one status to another.
   * @param from The transitioning from status to check.
   * @param to The transitioning to status to check.
   * @returns `true` if we can transition from `from` to `to`, or `false` if the transition is not allowed.
   */
  export function canTransition(
    from: ThingActionRequestStatus,
    to: ThingActionRequestStatus
  ) {
    if (from === to) {
      return false;
    }

    if (to === ThingActionRequestStatus.Pending) {
      return false;
    }

    if (isFinalStatus(from)) {
      return false;
    }

    return true;
  }
}
