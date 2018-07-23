import { EventEmitter } from "events";

import { injectable, inject } from "microinject";

import { ActionSource, ThingActionDef } from "../../../contracts/ActionSource";

import { ActionAggregator } from "../ActionAggregator";

@injectable(ActionAggregator)
export class ActionAggregatorImpl extends EventEmitter
  implements ActionAggregator {
  constructor(
    @inject(ActionSource, { all: true })
    private _actionSources: ActionSource[]
  ) {
    super();

    this._actionSources.forEach(source => {
      source.on("action.add", e =>
        this.emit("action.add", {
          thingId: e.thingId,
          action: scopeAction(source, e.action)
        })
      );

      source.on("action.remove", e =>
        this.emit("action.remove", {
          thingId: e.thingId,
          action: scopeAction(source, e.action)
        })
      );
    });
  }

  getActions(thingId: string): ReadonlyArray<ThingActionDef> {
    const actions = this._actionSources.reduce(
      (actions: ThingActionDef[], source) => {
        const sourceActions = source
          .getActions(thingId)
          .map(action => scopeAction(source, action));
        actions.push(...sourceActions);
        return actions;
      },
      []
    );

    Object.freeze(actions);
    return actions;
  }
}

function scopeAction(
  source: ActionSource,
  action: ThingActionDef
): ThingActionDef {
  const newAction = {
    ...action,
    id: `${source.id}::${action.id}`
  };
  Object.freeze(newAction);
  return newAction;
}
