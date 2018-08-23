export interface ThingActionRequest {
    readonly id: string;
    readonly timeRequested: string;
    readonly status: string;
    cancel(): boolean;
}
