import { ReadonlyRecord } from "../../../../../types";
import { Thing, ThingAction, ThingDef } from "../../types";
export declare class ThingImpl implements Thing {
    private _def;
    private _id;
    private _ownerId;
    private readonly _metadata;
    constructor(_def: ThingDef, _id: string, _ownerId: string);
    readonly id: string;
    readonly ownerPluginId: string;
    readonly name: string;
    readonly types: ReadonlyArray<string>;
    readonly description: string;
    readonly metadata: Record<string, any>;
    readonly actions: ReadonlyRecord<string, ThingAction>;
}
