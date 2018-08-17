import { ReadonlyRecord } from "../../../../../types";

import { ThingContext } from "../../../contracts/ThingSource";

import { ActionAggregator } from "../../actions/ActionAggregator";

import { Thing, ThingAction } from "../Thing";

import { ThingActionImpl } from "./ThingActionImpl";

export class ThingImpl implements Thing {
  readonly id: string;
  readonly types: string[];

  name: string;
  description: string;

  constructor(
    private _context: ThingContext,
    private _actionAggregator: ActionAggregator
  ) {
    this.id = _context.thingId;
    this.types = _context.thingTypes || [];
    this.name = _context.thingDefaultName || "Unnamed Thing";
    this.description = _context.thingDefaultDescription || "";
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    // TODO: Make these persistent.  Need event support.
    const actions: Record<string, ThingAction> = {};
    this._actionAggregator.getThingActions(this._context).forEach(def => {
      actions[def.actionId] = new ThingActionImpl(
        def,
        this._context,
        this._actionAggregator
      );
    });
    return Object.freeze(actions);
  }
}
