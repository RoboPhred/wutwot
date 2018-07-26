import { JSONSchema6 } from "json-schema";
export interface ThingActionDef {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly input: JSONSchema6;
}
export interface ThingActionInvocation {
    readonly id: string;
    readonly thingId: string;
    readonly actionId: string;
    readonly timeRequested: string;
}
