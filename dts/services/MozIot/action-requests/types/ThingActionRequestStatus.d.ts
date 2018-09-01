export declare enum ThingActionRequestStatus {
    Pending = "pending",
    Started = "started",
    Completed = "completed",
    Cancelled = "cancelled",
    Error = "error"
}
export declare namespace ThingActionRequestStatus {
    function isFinalStatus(status: ThingActionRequestStatus): boolean;
    function canTransition(from: ThingActionRequestStatus, to: ThingActionRequestStatus): boolean;
}
