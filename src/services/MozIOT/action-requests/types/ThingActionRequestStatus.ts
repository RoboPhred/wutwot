export enum ThingActionRequestStatus {
  Pending = "pending",
  Started = "started",
  Completed = "completed",
  Cancelled = "cancelled",
  Error = "error"
}

export namespace ThingActionRequestStatus {
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
