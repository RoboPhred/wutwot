export interface ThingActionRequest {
  readonly id: string;
  readonly timeRequested: string;
  readonly status: "pending" | "completed";
}
