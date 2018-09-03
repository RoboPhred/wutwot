import { injectable, singleton, provides, inject } from "microinject";

import { ActionService } from "../ActionService";

import { ThingActionDef, ThingAction } from "../../types";
import { ActionFactory, ActionRepository } from "../../components";

@injectable()
@singleton()
@provides(ActionService)
export class ActionServiceImpl implements ActionService {
  constructor(
    @inject(ActionFactory) private _factory: ActionFactory,
    @inject(ActionRepository) private _repository: ActionRepository
  ) {}

  getAction(thingId: string, actionId: string): ThingAction | undefined {
    return this._repository.get(thingId, actionId);
  }

  addAction(thingId: string, def: ThingActionDef, owner: object): ThingAction {
    const action = this._factory.createAction(def, thingId, owner);
    this._repository.addAction(thingId, action);
    return action;
  }
}
