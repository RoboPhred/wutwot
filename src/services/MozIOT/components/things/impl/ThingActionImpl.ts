import {
  ThingActionDef,
  ThingActionInvocation,
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
    return this._def.id;
  }

  get label(): string {
    return this._def.label;
  }

  get description(): string {
    return this._def.description;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    const invocations = this._source
      .getThingInvocations(this._thingContext)
      .filter(x => x.actionId === this._def.id);
    const requests = invocations.map(x => this._invocationToRequest(x));
    return Object.freeze(requests);
  }

  invoke(input: any): ThingActionRequest {
    const invocation = this._source.invokeAction(
      this._thingContext,
      this._def.id,
      input
    );
    return this._invocationToRequest(invocation);
  }

  private _invocationToRequest(
    invocation: ThingActionInvocation
  ): ThingActionRequest {
    const source = this._source;
    const request = {
      id: invocation.id,
      timeRequested: invocation.timeRequested,
      status: "pending",
      cancel() {
        if (request.status === "cancelled") {
          return false;
        }
        request.status = "cancelled";
        return source.cancelInvocation(invocation.id);
      }
    };
    return request;
  }
}
