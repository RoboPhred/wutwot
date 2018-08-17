import { JSONSchema6 } from "json-schema";
/**
 * A definition of an action to perform.
 */
export interface ThingActionDef {
    readonly actionId: string;
    readonly thingId: string;
    readonly label: string;
    readonly description: string;
    readonly input: JSONSchema6;
}
/**
 * A description of an action being performed.
 */
export interface ThingActionRequestDef {
    readonly requestId: string;
    readonly thingId: string;
    readonly actionId: string;
    readonly timeRequested: string;
}
