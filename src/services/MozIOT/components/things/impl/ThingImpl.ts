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
    private _thingContext: ThingContext,
    private _actionAggregator: ActionAggregator
  ) {
    this.id = _thingContext.thingId;
    this.types = _thingContext.thingTypes || [];
    this.name = _thingContext.thingDefaultName || "Unnamed Thing";
    this.description = _thingContext.thingDefaultDescription || "";
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    // TODO: Make these persistent.  Need event support.
    const actions: Record<string, ThingAction> = {};
    this._actionAggregator
      .getThingActions(this._thingContext)
      .forEach(actionContext => {
        actions[actionContext.actionId] = new ThingActionImpl(
          this._thingContext,
          actionContext,
          this._actionAggregator
        );
      });
    return Object.freeze(actions);
  }
}
