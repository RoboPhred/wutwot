import { ReadonlyRecord } from "../../../../../types";

import { ThingDef } from "../../../contracts/ThingSource";

import { ActionAggregator } from "../../actions/ActionAggregator";

import { Thing, ThingAction } from "../Thing";

import { ThingActionImpl } from "./ThingActionImpl";

export class ThingImpl implements Thing {
  readonly id: string;
  readonly type: string;

  name: string;
  description: string;

  constructor(def: ThingDef, private _actionAggregator: ActionAggregator) {
    this.id = def.id;
    this.type = def.type;
    this.name = def.defaultName || "Unnamed Thing";
    this.description = def.defaultDescription || "";
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    // TODO: Make these persistent.  Need event support.
    const actions = this._actionAggregator
      .getThingActions(this.id)
      .map(def => new ThingActionImpl(def, this._actionAggregator));
    const records: Record<string, ThingAction> = {};
    for (const action of actions) {
      records[action.id] = action;
    }
    return Object.freeze(records);
  }
}
