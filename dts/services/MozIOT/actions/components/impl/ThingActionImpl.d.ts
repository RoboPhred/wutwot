import { JSONSchema6 } from "json-schema";
import { ThingAction, ThingActionDef } from "../../types";
import { DeepImmutableObject } from "../../../../../types";
export declare class ThingActionImpl implements ThingAction {
    private _def;
    private _id;
    private _thingId;
    private _owner;
    constructor(_def: ThingActionDef, _id: string, _thingId: string, _owner: object);
    readonly id: string;
    readonly thingId: string;
    readonly ownerPlugin: object;
    readonly label: string;
    readonly description: string;
    readonly input: DeepImmutableObject<JSONSchema6>;
    request(input: any): void;
}
