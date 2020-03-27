import { injectable, singleton, provides, inject } from "microinject";

import { ThingEventSource, ThingRemovedEventArgs } from "../../../things";

import { ThingActionDef, ThingAction } from "../../types";
import { ActionFactory, ActionRepository } from "../../components";

import { ActionService } from "../ActionService";

@injectable()
@singleton()
@provides(ActionService)
export class ActionServiceImpl implements ActionService {
  constructor(
    @inject(ActionFactory) private _factory: ActionFactory,
    @inject(ActionRepository) private _repository: ActionRepository,
    @inject(ThingEventSource) thingEventSource: ThingEventSource
  ) {
    thingEventSource.on("thing.remove", this._onThingRemoved.bind(this));
  }

  getAction(thingId: string, actionId: string): ThingAction | undefined {
    return this._repository.get(thingId, actionId);
  }

  getForThing(thingId: string): ThingAction[] {
    return this._repository.getForThing(thingId);
  }

  addAction(thingId: string, def: ThingActionDef, owner: object): ThingAction {
    const action = this._factory.createAction(def, thingId, owner);
    this._repository.addAction(thingId, action);
    return action;
  }

  private _onThingRemoved(e: ThingRemovedEventArgs) {
    this._repository.removeAllThingActions(e.thingId);
  }
}
