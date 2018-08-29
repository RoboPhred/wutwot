import { ReadonlyRecord } from "../../../../../types";
import { ThingAction } from "../../../actions";
import { ActionRegistry } from "../../../actions/components";
import { Thing, ThingDef } from "../../types";
export declare class ThingImpl implements Thing {
    private _def;
    private _id;
    private _owner;
    private _actionRegistry;
    private readonly _metadata;
    constructor(_def: ThingDef, _id: string, _owner: object, _actionRegistry: ActionRegistry);
    readonly id: string;
    readonly ownerPlugin: object;
    readonly name: string;
    readonly types: ReadonlyArray<string>;
    readonly description: string;
    readonly metadata: Record<string, any>;
    readonly actions: ReadonlyRecord<string, ThingAction>;
}
