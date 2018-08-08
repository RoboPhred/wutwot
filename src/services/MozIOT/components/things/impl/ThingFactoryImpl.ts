import { injectable, inject } from "microinject";

import { ThingContext } from "../../../contracts/ThingSource";

import { ActionAggregator } from "../../actions/ActionAggregator";

import { ThingFactory } from "../ThingFactory";
import { Thing } from "../Thing";
import { ThingImpl } from "./ThingImpl";

@injectable(ThingFactory)
export class ThingFactoryImpl implements ThingFactory {
  constructor(
    @inject(ActionAggregator) private _actionAggregator: ActionAggregator
  ) {}

  createThing(context: ThingContext): Thing {
    return new ThingImpl(context, this._actionAggregator);
  }
}
