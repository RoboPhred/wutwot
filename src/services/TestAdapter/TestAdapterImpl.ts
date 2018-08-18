import { EventEmitter } from "events";

import { injectable, provides, singleton } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ActionSource,
  ThingDef,
  ThingActionDef,
  ThingActionRequestDef,
  ThingSource,
  ThingContext,
  ThingActionContext,
  ThingActionRequestContext
} from "../MozIOT";

const testActionDef = Object.freeze({
  actionId: "thing-test-action",
  actionLabel: "Do That Thing",
  actionDescription: "A test action",
  actionInput: { type: "null" as "null" },
  actionMetadata: {}
});

@injectable()
@provides(ThingSource)
@provides(ActionSource)
@singleton()
export class TestAdapterImpl extends EventEmitter
  implements ThingSource, ActionSource {
  public readonly id: "test-adapter" = "test-adapter";

  private readonly _defs: ThingDef[] = [];
  private readonly _requests: ThingActionRequestDef[] = [];

  constructor() {
    super();
    this.addTestThing();
  }

  get things(): ReadonlyArray<ThingDef> {
    return Object.freeze([...this._defs]);
  }

  getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef> {
    if (thingContext.thingSourceId !== this.id) {
      return [];
    }

    if (!this._defs.find(x => x.thingId === thingContext.thingSourceThingId)) {
      return [];
    }

    return Object.freeze([
      {
        ...testActionDef,
        thingId: thingContext.thingId
      }
    ]);
  }

  getThingActionRequests(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionRequestDef> {
    const results = this._requests.filter(
      x => x.thingId === thingContext.thingId
    );
    Object.freeze(results);
    return results;
  }

  requestAction(
    actionContext: ThingActionContext,
    input: any
  ): ThingActionRequestDef {
    const request: ThingActionRequestDef = Object.freeze({
      requestId: uuidV4(),
      thingId: actionContext.thingId,
      actionId: actionContext.actionId,
      requestCreatedTime: new Date().toISOString(),
      requestMetadata: {}
    });

    console.log(
      "Test action starting on",
      actionContext.thingId,
      "=>",
      request
    );
    this._requests.push(request);

    setTimeout(() => {
      const index = this._requests.indexOf(request);
      if (index > -1) {
        console.log(
          "Test action ending on",
          actionContext.thingId,
          "=>",
          request
        );
        this._requests.splice(index, 1);
      }
    }, 10 * 1000);

    return request;
  }

  cancelRequest(requestContext: ThingActionRequestContext) {
    const { requestId } = requestContext;

    const index = this._requests.findIndex(x => x.requestId === requestId);
    if (index) {
      this._requests.splice(index, 1);
      return true;
    }
    return false;
  }

  public addTestThing(def?: Partial<ThingDef>) {
    if (!def) {
      def = {};
    }

    const thingId =
      def.thingId ||
      `test-device-${Math.random()
        .toString()
        .substr(2)}`;
    const defaultName = def.thingDefaultName || `Named: ${thingId}`;

    const finalDef = {
      thingId,
      description: "A test thing",
      defaultName
    };
    Object.freeze(finalDef);

    this._defs.push(finalDef);

    this.emit("thing.add", { thing: finalDef });
  }

  public removeTestThing(id?: string) {
    if (this._defs.length === 0) {
      return;
    }

    if (id == null) {
      id = this._defs[0].thingId;
    }

    const index = this._defs.findIndex(x => x.thingId === id);
    if (index === -1) {
      return;
    }

    const def = this._defs[index];
    this._defs.splice(index, 1);

    this.emit("thing.remove", { thing: def });
  }
}
