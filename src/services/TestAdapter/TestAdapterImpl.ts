import { EventEmitter } from "events";

import { injectable, provides, singleton } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ActionSource,
  ThingDef,
  ThingActionDef,
  ThingActionInvocation,
  ThingSource,
  ThingContext
} from "../MozIOT";

const testActionDef = Object.freeze({
  id: "thing-test-action",
  label: "Do That Thing",
  description: "A test action",
  input: { type: "null" as "null" }
});

@injectable()
@provides(ThingSource)
@provides(ActionSource)
@singleton()
export class TestAdapterImpl extends EventEmitter
  implements ThingSource, ActionSource {
  public readonly id: "test-adapter" = "test-adapter";

  private readonly _defs: ThingDef[] = [];
  private readonly _invocations: ThingActionInvocation[] = [];

  constructor() {
    super();
    this.addTestThing();
  }

  get things(): ReadonlyArray<ThingDef> {
    return Object.freeze([...this._defs]);
  }

  getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef> {
    if (!this._defs.find(x => x.thingId === thingContext.thingOwnerThingId)) {
      return [];
    }

    return Object.freeze([
      {
        ...testActionDef,
        thingId: thingContext.thingId
      }
    ]);
  }

  getThingInvocations(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionInvocation> {
    const results = this._invocations.filter(
      x => x.thingId === thingContext.thingId
    );
    Object.freeze(results);
    return results;
  }

  invokeAction(
    thingContext: ThingContext,
    actionId: string,
    input: any
  ): ThingActionInvocation {
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
    this._invocations.push(invocation);

    setTimeout(() => {
      const index = this._invocations.indexOf(invocation);
      if (index > -1) {
        console.log(
          "Test action ending on",
          thingContext.thingId,
          "=>",
          invocation
        );
        this._invocations.splice(index, 1);
      }
    }, 10 * 1000);

    return invocation;
  }

  cancelInvocation(invocationId: string) {
    const index = this._invocations.findIndex(x => x.id === invocationId);
    if (index) {
      this._invocations.splice(index, 1);
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
