import { EventEmitter } from "events";

import { injectable, singleton, provides } from "microinject";

import { ThingAction } from "../../types";

import {
  ActionRegistry,
  ThingActionAddedEventArgs,
  ThingActionRemovedEventArgs
} from "../ActionRegistry";
import { ActionRepository } from "../ActionRepository";

@injectable()
@singleton()
@provides(ActionRegistry)
@provides(ActionRepository)
export class ActionRepositoryImpl extends EventEmitter
  implements ActionRepository {
  private _actionsByThingId = new Map<string, ThingAction[]>();

  addAction(thingId: string, action: ThingAction): void {
    let actions = this._actionsByThingId.get(thingId);
    if (!actions) {
      actions = [];
      this._actionsByThingId.set(thingId, actions);
    }

    if (actions.find(x => x.id === action.id)) {
      throw new Error("Duplicate action id.");
    }

    actions.push(action);

    const e: ThingActionAddedEventArgs = {
      thingId,
      actionId: action.id,
      action
    };
    this.emit("action.add", e);
  }

  removeAction(thingId: string, actionId: string): void {
    const actions = this._actionsByThingId.get(thingId) || [];
    const idx = actions.findIndex(x => x.id === actionId);
    if (idx !== -1) {
      actions.splice(idx, 1);

      const e: ThingActionRemovedEventArgs = {
        thingId,
        actionId
      };
      this.emit("action.remove", e);
    }
  }

  removeAllThingActions(thingId: string): void {
    const actions = this._actionsByThingId.get(thingId) || [];

    const removeEvents: ThingActionRemovedEventArgs[] = actions.map(action => ({
      thingId,
      actionId: action.id
    }));

    this._actionsByThingId.delete(thingId);

    removeEvents.forEach(e => this.emit("action.remove", e));
  }

  get(thingId: string, actionId: string): ThingAction | undefined {
    const actions = this._actionsByThingId.get(thingId) || [];
    return actions.find(x => x.id === actionId);
  }

  getForThing(thingId: string): ThingAction[] {
    const actions = this._actionsByThingId.get(thingId) || [];
    return [...actions];
  }
}
