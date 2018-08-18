import { JSONSchema6 } from "json-schema";
import { ReadonlyRecord, DeepImmutable } from "../../../../../types";
/**
 * A definition of an action to perform.
 */
export interface ThingActionDef {
    readonly actionId: string;
    readonly thingId: string;
    readonly actionLabel: string;
    readonly actionDescription: string;
    readonly actionInput: DeepImmutable<JSONSchema6>;
    readonly actionMetadata: ReadonlyRecord<string, any>;
}
export interface ThingActionContext extends ThingActionDef {
    actionSourceId: string;
    actionSourceActionId: string;
}
/**
 * A description of an action being performed.
 */
export interface ThingActionRequestDef {
    readonly thingId: string;
    readonly actionId: string;
    readonly requestId: string;
    readonly requestCreatedTime: string;
    readonly requestMetadata: ReadonlyRecord<string, any>;
}
export interface ThingActionRequestContext extends ThingActionRequestDef {
    actionSourceId: string;
    actionSourceActionId: string;
    actionSourceRequestId: string;
}
