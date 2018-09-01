import { JSONSchema6 } from "json-schema";
import { DeepImmutableObject } from "../../../../../types";
import { ThingAction, ThingActionDef } from "../../types";
import { ThingActionRequest } from "../../../action-requests";
import { ActionRequestFactory } from "../../../action-requests/components/ActionRequestFactory";
import { ActionRequestRepository } from "../../../action-requests/components/ActionRequestRepository";
export declare class ThingActionImpl implements ThingAction {
    private _def;
    private _id;
    private _thingId;
    private _owner;
    private _actionRequestFactory;
    private _actionRepository;
    constructor(_def: ThingActionDef, _id: string, _thingId: string, _owner: object, _actionRequestFactory: ActionRequestFactory, _actionRepository: ActionRequestRepository);
    readonly id: string;
    readonly thingId: string;
    readonly ownerPlugin: object;
    readonly label: string;
    readonly description: string;
    readonly input: DeepImmutableObject<JSONSchema6>;
    readonly requests: ReadonlyArray<ThingActionRequest>;
    request(input: any): ThingActionRequest;
}
