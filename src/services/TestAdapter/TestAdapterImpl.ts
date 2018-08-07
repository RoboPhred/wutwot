import { EventEmitter } from "events";

import { injectable, provides, singleton } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ActionSource,
  ThingDef,
  ThingActionDef,
  ThingActionInvocation,
  ThingSource
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

  getThingActions(thingId: string): ReadonlyArray<ThingActionDef> {
    if (!this._defs.find(x => x.id === thingId)) {
      return [];
    }

    return Object.freeze([
      {
        ...testActionDef,
        thingId
      }
    ]);
  }

  getThingInvocations(thingId: string): ReadonlyArray<ThingActionInvocation> {
    const results = this._invocations.filter(x => x.thingId === thingId);
    Object.freeze(results);
    return results;
  }

  invokeAction(
    thingId: string,
    actionId: string,
    input: any
  ): ThingActionInvocation {
    const invocation: ThingActionInvocation = Object.freeze({
      id: uuidV4(),
      thingId,
      actionId,
      timeRequested: new Date().toISOString()
    });
    console.log("Test action starting on", thingId, "=>", invocation);

    setTimeout(() => {
      const index = this._invocations.indexOf(invocation);
      if (index > -1) {
        console.log("Test action ending on", thingId, "=>", invocation);
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

    const id =
      def.id ||
      `test-device-${Math.random()
        .toString()
        .substr(2)}`;
    const defaultName = def.defaultName || `Named: ${id}`;

    const finalDef = {
      id,
      type: "test-thing",
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
      id = this._defs[0].id;
    }

    const index = this._defs.findIndex(x => x.id === id);
    if (index === -1) {
      return;
    }

    const def = this._defs[index];
    this._defs.splice(index, 1);

    this.emit("thing.remove", { thing: def });
  }
}
