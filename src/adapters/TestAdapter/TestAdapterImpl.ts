import { EventEmitter } from "events";

import { ActionSource, ThingActionDef } from "../../ActionSource";
import { ThingSource, ThingDef } from "../../ThingSource";

export class TestAdapterImpl extends EventEmitter
  implements ThingSource, ActionSource {
  public readonly id: "test-adapter" = "test-adapter";

  private readonly _defs: ThingDef[] = [];

  get things(): ReadonlyArray<ThingDef> {
    return Object.freeze([...this._defs]);
  }

  getActions(thingId: string): ReadonlyArray<ThingActionDef> {
    if (!this._defs.find(x => x.id === thingId)) {
      return [];
    }

    const action = Object.freeze({
      id: "thing-test-action",
      label: "Do That Thing",
      description: "A test action"
    });
    return Object.freeze([action]);
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
