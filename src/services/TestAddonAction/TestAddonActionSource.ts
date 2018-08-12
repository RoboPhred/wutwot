import { injectable } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ActionSource,
  ThingContext,
  ThingActionInvocation,
  ThingActionDef
} from "../MozIOT";

@injectable(ActionSource)
export class TestAddonActionSource implements ActionSource {
  private _invocationsById = new Map<string, ThingActionInvocation>();
  private readonly _actionId = "test-addon-action";

  readonly id = "TestAddonActionSource";

  getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef> {
    const def: ThingActionDef = {
      id: this._actionId,
      thingId: thingContext.thingId,
      description: "A third party addon action",
      input: { type: "null" },
      label: "Addon Action"
    };
    return Object.freeze([def]);
  }

  getThingInvocations(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionInvocation> {
    const invocations = Array.from(this._invocationsById.values()).filter(
      x => x.thingId === thingContext.thingId
    );
    return Object.freeze(invocations);
  }

  invokeAction(
    thingContext: ThingContext,
    actionId: string
  ): ThingActionInvocation {
    if (actionId !== this._actionId) {
      throw new Error(
        "This action source does not control the requested action."
      );
    }

    const invocation: ThingActionInvocation = Object.freeze({
      id: uuidV4(),
      thingId: thingContext.thingId,
      actionId,
      timeRequested: new Date().toISOString()
    });
    console.log(
      "Test action starting on",
      thingContext.thingId,
      "=>",
      invocation
    );
    this._invocationsById.set(invocation.id, invocation);

    setTimeout(() => {
      if (this._invocationsById.has(invocation.id)) {
        this._invocationsById.delete(invocation.id);
        console.log(
          "Test action ending on",
          thingContext.thingId,
          "=>",
          invocation
        );
      }
    }, 10 * 1000);

    return invocation;
  }

  cancelInvocation(invocationId: string): boolean {
    if (!this._invocationsById.has(invocationId)) {
      return false;
    }

    this._invocationsById.delete(invocationId);
    return true;
  }
}
