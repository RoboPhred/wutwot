import { EventEmitter } from "events";

import { injectable, provides, singleton } from "microinject";

import { ThingActionContext } from "../../contracts";

import { ActionRepository } from "../ActionRepository";

import {
  ActionRegistry,
  ActionAddedEventArgs,
  ActionRemovedEventArgs
} from "../ActionRegistry";

@injectable()
@singleton()
@provides(ActionRepository)
@provides(ActionRegistry)
export class ThingRepositoryImpl extends EventEmitter
  implements ActionRepository {
  private _actions: ThingActionContext[] = [];

  get actions(): ReadonlyArray<ThingActionContext> {
    return [...this._actions];
  }

  get(thingId: string, actionId: string): ThingActionContext | undefined {
    return this._actions.find(
      x => x.thingId === thingId && x.actionId === actionId
    );
  }

  addAction(action: ThingActionContext): void {
    if (this.get(action.thingId, action.actionId)) {
      throw new Error("Duplicate actionId for thing.");
    }

    action = Object.freeze({ ...action });
    this._actions.push(action);

    const e: ActionAddedEventArgs = {
      thingId: action.thingId,
      actionId: action.actionId,
      action
    };
    this.emit("action.add", e);
  }

  removeAction(thingId: string, actionId: string): void {
    const idx = this._actions.findIndex(
      x => x.thingId === thingId && x.actionId === actionId
    );
    if (idx !== -1) {
      this._actions.splice(idx, 1);
      const e: ActionRemovedEventArgs = {
        thingId,
        actionId
      };
      this.emit("action.remove", e);
    }
  }
}
