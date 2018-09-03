import { ReadonlyRecord } from "../../../../../types";
import { ThingTypesService } from "../../../thing-types";
import { ActionService, ThingAction } from "../../../actions";
import { Thing, ThingDef } from "../../types";
export declare class ThingImpl implements Thing {
    private _def;
    private _id;
    private _owner;
    private _typesService;
    private _actionService;
    private readonly _metadata;
    constructor(_def: ThingDef, _id: string, _owner: object, _typesService: ThingTypesService, _actionService: ActionService);
    readonly id: string;
    readonly ownerPlugin: object;
    readonly name: string;
    readonly types: ReadonlyArray<string>;
    readonly description: string;
    readonly metadata: Record<string, any>;
    readonly actions: ReadonlyRecord<string, ThingAction>;
}
