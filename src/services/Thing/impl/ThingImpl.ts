import { ReadonlyRecord } from "../../../types";

import { ThingDef } from "../../../contracts/ThingSource";

import { ActionAggregator } from "../../ActionAggregator/ActionAggregator";

import { Thing, ThingAction } from "../Thing";

export class ThingImpl implements Thing {
  readonly id: string;

  name: string;

  readonly type: string = "NOT IMPLEMENTED";
  readonly description: string = "NOT IMPLEMENTED";

  constructor(def: ThingDef, private _actionAggregator: ActionAggregator) {
    this.id = def.id;
    this.name = def.defaultName || "Unnamed Thing";
  }

  get actions(): ReadonlyRecord<string, ThingAction> {}
}
