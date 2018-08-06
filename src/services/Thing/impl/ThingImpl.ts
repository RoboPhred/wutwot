import { ReadonlyRecord } from "../../../types";

import { ThingDef } from "../../../contracts/ThingSource";

import { ActionAggregator } from "../../ActionAggregator/ActionAggregator";

import { Thing, ThingAction } from "../Thing";

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
    return this._actionAggregator.getThingActions(this.id);
  }
}
