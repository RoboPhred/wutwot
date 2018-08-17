import { injectable } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ActionSource,
  ThingContext,
  ThingActionRequestDef,
  ThingActionDef
} from "../MozIOT";

@injectable(ActionSource)
export class TestAddonActionSource implements ActionSource {
  private _invocationsById = new Map<string, ThingActionRequestDef>();
  private readonly _actionId = "test-addon-action";

  readonly id = "TestAddonActionSource";

  getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef> {
    const def: ThingActionDef = {
      actionId: this._actionId,
      thingId: thingContext.thingId,
      description: "A third party addon action",
      input: { type: "null" },
      label: "Addon Action"
    };
    return Object.freeze([def]);
  }

  getThingActionRequests(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionRequestDef> {
    const invocations = Array.from(this._invocationsById.values()).filter(
      x => x.thingId === thingContext.thingId
    );
    return Object.freeze(invocations);
  }

  requestAction(
    thingContext: ThingContext,
    actionId: string
  ): ThingActionRequestDef {
    if (actionId !== this._actionId) {
      throw new Error(
        "This action source does not control the requested action."
      );
    }

    const request: ThingActionRequestDef = Object.freeze({
      requestId: uuidV4(),
      thingId: thingContext.thingId,
      actionId,
      timeRequested: new Date().toISOString()
    });
    console.log("Test action starting on", thingContext.thingId, "=>", request);
    this._invocationsById.set(request.requestId, request);

    setTimeout(() => {
      if (this._invocationsById.has(request.requestId)) {
        this._invocationsById.delete(request.requestId);
        console.log(
          "Test action ending on",
          thingContext.thingId,
          "=>",
          request
        );
      }
    }, 10 * 1000);

    return request;
  }

  cancelInvocation(invocationId: string): boolean {
    if (!this._invocationsById.has(invocationId)) {
      return false;
    }

    this._invocationsById.delete(invocationId);
    return true;
  }
}
