import { JSONSchema6 } from "json-schema";
export interface ThingAction {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly input: JSONSchema6;
}
