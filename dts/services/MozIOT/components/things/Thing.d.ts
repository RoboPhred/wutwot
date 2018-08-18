import { ReadonlyRecord } from "../../../../types";
export interface Thing {
    readonly id: string;
    name: string;
    readonly types: string[];
    readonly description: string;
    readonly actions: ReadonlyRecord<string, ThingAction>;
}
export interface ThingAction {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly requests: ReadonlyArray<ThingActionRequest>;
    readonly input: any;
    request(input: any): ThingActionRequest;
}
export interface ThingActionRequest {
    readonly id: string;
    readonly timeRequested: string;
    readonly status: string;
    cancel(): boolean;
}
