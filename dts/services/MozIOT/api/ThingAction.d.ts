import { ThingActionRequest } from "./ThingActionRequest";
export interface ThingAction {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly requests: ReadonlyArray<ThingActionRequest>;
    readonly input: any;
    request(input: any): ThingActionRequest;
}
