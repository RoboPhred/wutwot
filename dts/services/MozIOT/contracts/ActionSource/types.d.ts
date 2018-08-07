import { JSONSchema6 } from "json-schema";
/**
 * A definition of an action to perform.
 */
export interface ThingActionDef {
    readonly id: string;
    readonly thingId: string;
    readonly label: string;
    readonly description: string;
    readonly input: JSONSchema6;
}
/**
 * A description of an action being performed.
 */
export interface ThingActionInvocation {
    readonly id: string;
    readonly thingId: string;
    readonly actionId: string;
    readonly timeRequested: string;
}
