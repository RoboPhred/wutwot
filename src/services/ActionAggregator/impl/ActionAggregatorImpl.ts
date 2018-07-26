import { EventEmitter } from "events";

import { injectable, inject } from "microinject";

import {
  ActionSource,
  ThingActionDef,
  ActionEventArgs
} from "../../../contracts/ActionSource";

import { ActionAggregator } from "../ActionAggregator";

@injectable(ActionAggregator)
export class ActionAggregatorImpl extends EventEmitter
  implements ActionAggregator {
  readonly id: string = "aggregator";

  private _actions = new Map<string, ActionDetails>();

  get actions(): ReadonlyArray<ThingActionDef> {
    const actions = Array.from(this._actions.values()).map(x => x.publicAction);
    Object.freeze(actions);
    return actions;
  }

  constructor(
    @inject(ActionSource, { all: true })
    private _actionSources: ActionSource[]
  ) {
    super();

    this._actionSources.forEach(source => {
      source.on("action.add", e => this._addAction(source, e.action));

      source.on("action.remove", e => this._removeAction(source, e.action));
    });
  }

  private _addAction(source: ActionSource, action: ThingActionDef) {
    const publicId = this._scopeActionId(source, action);
    const publicAction = Object.freeze({
      ...action,
      id: publicId
    });

    let details = this._actions.get(publicId);
    if (details === undefined) {
      details = {
        source,
        sourceAction: action,
        publicAction
      };
      this._actions.set(publicId, details);
    }

    this._actions.set(publicId, details);

    const e: ActionEventArgs = {
      action: publicAction
    };

    this.emit("action.add", e);
  }

  private _removeAction(source: ActionSource, action: ThingActionDef) {
    const publicId = this._scopeActionId(source, action);

    const details = this._actions.get(publicId);
    if (!details) {
      return;
    }

    this._actions.delete(publicId);

    const e: ActionEventArgs = {
      action: details.publicAction
    };

    this.emit("action.remove", e);
  }

  private _scopeActionId(source: ActionSource, action: ThingActionDef): string {
    return `${source.id}::${action.id}`;
  }
}

interface ActionDetails {
  /**
   * The source that defined this action.
   */
  source: ActionSource;

  sourceAction: ThingActionDef;

  publicAction: ThingActionDef;
}
