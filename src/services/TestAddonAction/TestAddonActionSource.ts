import { injectable } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ActionSource,
  ThingContext,
  ThingActionRequestDef,
  ThingActionDef,
  ThingActionContext,
  ThingActionRequestContext
} from "../MozIOT";

@injectable(ActionSource)
export class TestAddonActionSource implements ActionSource {
  private _requestsById = new Map<string, ThingActionRequestDef>();
  private readonly _actionId = "test-addon-action";

  readonly id = "TestAddonActionSource";

  getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef> {
    const def: ThingActionDef = {
      actionId: this._actionId,
      thingId: thingContext.thingId,
      actionDescription: "A third party addon action",
      actionInput: { type: "null" },
      actionLabel: "Addon Action",
      actionMetadata: {}
    };
    return Object.freeze([def]);
  }

  getThingActionRequests(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionRequestDef> {
    const invocations = Array.from(this._requestsById.values()).filter(
      x => x.thingId === thingContext.thingId
    );
    return Object.freeze(invocations);
  }

  requestAction(
    actionContext: ThingActionContext,
    input: any
  ): ThingActionRequestDef {
    const { thingId, actionId, actionSourceActionId } = actionContext;

    if (actionSourceActionId !== this._actionId) {
      throw new Error(
        "This action source does not control the requested action."
      );
    }

    const requestId = uuidV4();
    const request: ThingActionRequestDef = Object.freeze({
      requestId,
      thingId,
      actionId,
      requestCreatedTime: new Date().toISOString(),
      requestMetadata: {}
    });
    console.log("Test action starting on", thingId, "=>", request);
    this._requestsById.set(requestId, request);

    setTimeout(() => {
      if (this._requestsById.has(requestId)) {
        this._requestsById.delete(requestId);
        console.log("Test action ending on", thingId, "=>", request);
      }
    }, 10 * 1000);

    return request;
  }

  cancelRequest(requestContext: ThingActionRequestContext): boolean {
    const { actionSourceRequestId: requestId } = requestContext;
    if (!this._requestsById.has(requestId)) {
      return false;
    }

    this._requestsById.delete(requestId);
    return true;
  }
}
