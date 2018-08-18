import {
  ThingActionDef,
  ThingActionRequestDef,
  ActionSource
} from "../../../contracts/ActionSource";

import { ThingContext } from "../../../contracts";

import { ThingAction, ThingActionRequest } from "../Thing";

export class ThingActionImpl implements ThingAction {
  constructor(
    private _def: ThingActionDef,
    private _thingContext: ThingContext,
    private _source: ActionSource
  ) {}

  get id(): string {
    return this._def.actionId;
  }

  get label(): string {
    return this._def.actionLabel;
  }

  get description(): string {
    return this._def.actionDescription;
  }

  get input(): any {
    return this._def.actionInput;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    const invocations = this._source
      .getThingActionRequests(this._thingContext)
      .filter(x => x.actionId === this._def.actionId);
    const requests = invocations.map(x => this._requestDefToRequest(x));
    return Object.freeze(requests);
  }

  invoke(input: any): ThingActionRequest {
    const invocation = this._source.requestAction(
      this._thingContext,
      this._def.actionId,
      input
    );
    return this._requestDefToRequest(invocation);
  }

  private _requestDefToRequest(
    invocation: ThingActionRequestDef
  ): ThingActionRequest {
    const source = this._source;
    const request = {
      id: invocation.requestId,
      timeRequested: invocation.timeRequested,
      status: "pending",
      cancel() {
        if (request.status === "cancelled") {
          return false;
        }
        request.status = "cancelled";
        return source.cancelInvocation(invocation.requestId);
      }
    };
    return request;
  }
}
