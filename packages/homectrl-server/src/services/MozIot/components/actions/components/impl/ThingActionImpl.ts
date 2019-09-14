import { JSONSchema6 } from "json-schema";

import { DeepImmutableObject } from "../../../../types";

import { ThingAction, ThingActionDef } from "../../types";
import { validateOrThrow } from "../../../json-schema";

import { ThingActionRequest } from "../../../action-requests";

// TODO: Components should not be used outside their service scope.
//  We need to access this functionality from an action-request service.
import { ActionRequestFactory } from "../../../action-requests/components/ActionRequestFactory";
import { ActionRequestRepository } from "../../../action-requests/components/ActionRequestRepository";

export class ThingActionImpl implements ThingAction {
  private _def: ThingActionDef;

  constructor(
    def: ThingActionDef,
    private _id: string,
    private _thingId: string,
    private _owner: object,
    private _actionRequestFactory: ActionRequestFactory,
    private _actionRepository: ActionRequestRepository
  ) {
    this._def = { ...def };
  }

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thingId;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get title(): string {
    return this._def.title;
  }

  get semanticType(): string | undefined {
    return this._def.semanticType;
  }

  get description(): string {
    return this._def.description;
  }

  get input(): DeepImmutableObject<JSONSchema6> {
    return this._def.input;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    return Object.seal(
      this._actionRepository.getForThingAction(this._thingId, this._id)
    );
  }

  request(input: any): ThingActionRequest {
    validateOrThrow(input, this._def.input);

    const status = this._def.onActionInvocationRequested(
      this._thingId,
      this._id,
      input
    );

    const request = this._actionRequestFactory.createActionRequest(
      this._thingId,
      this._id,
      input,
      new Date().toISOString(),
      status
    );

    this._actionRepository.addRequest(request);
    return request;
  }
}
