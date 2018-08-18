import {
  ActionAggregator,
  ThingActionContext,
  ThingActionRequestContext
} from "../../../actions";

import { ThingContext } from "../../contracts";

import { ThingAction, ThingActionRequest } from "../Thing";

export class ThingActionImpl implements ThingAction {
  constructor(
    private _thingContext: ThingContext,
    private _actionContext: ThingActionContext,
    private _actionAggregator: ActionAggregator
  ) {}

  get id(): string {
    return this._actionContext.actionId;
  }

  get label(): string {
    return this._actionContext.actionLabel;
  }

  get description(): string {
    return this._actionContext.actionDescription;
  }

  get input(): any {
    return this._actionContext.actionInput;
  }

  get requests(): ReadonlyArray<ThingActionRequest> {
    const requests = this._actionAggregator
      .getThingActionRequests(this._thingContext)
      .filter(x => x.actionId === this._actionContext.actionId);

    const instances = requests.map(x => this._requestfToInstance(x));
    return Object.freeze(instances);
  }

  request(input: any): ThingActionRequest {
    const invocation = this._actionAggregator.requestAction(
      this._actionContext,
      input
    );
    return this._requestfToInstance(invocation);
  }

  private _requestfToInstance(
    requestContext: ThingActionRequestContext
  ): ThingActionRequest {
    const source = this._actionAggregator;
    const request = {
      id: requestContext.requestId,
      timeRequested: requestContext.requestCreatedTime,
      status: "pending",
      cancel() {
        if (request.status === "cancelled") {
          return false;
        }
        request.status = "cancelled";
        return source.cancelRequest(requestContext);
      }
    };
    return request;
  }
}
