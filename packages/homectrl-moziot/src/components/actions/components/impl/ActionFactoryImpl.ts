import { injectable, singleton, provides, inject } from "microinject";

import { IdMapper } from "../../../../utils";

import { ActionRequestFactory } from "../../../action-requests/components/ActionRequestFactory";
import { ActionRequestRepository } from "../../../action-requests/components/ActionRequestRepository";

import { ThingActionDef, ThingAction } from "../../types";

import { ActionFactory } from "../ActionFactory";

import { ThingActionImpl } from "./ThingActionImpl";

@injectable()
@singleton()
@provides(ActionFactory)
export class ActionFactoryImpl implements ActionFactory {
  private _thingActionIdMappers = new Map<string, IdMapper>();

  constructor(
    @inject(ActionRequestFactory)
    private _actionRequestFactory: ActionRequestFactory,
    @inject(ActionRequestRepository)
    private _actionRequestRepository: ActionRequestRepository
  ) {}

  createAction(
    action: ThingActionDef,
    thingId: string,
    owner: object
  ): ThingAction {
    let idMapper = this._thingActionIdMappers.get(thingId);
    if (idMapper == null) {
      idMapper = new IdMapper();
      this._thingActionIdMappers.set(thingId, idMapper);
    }
    const id = idMapper.createId(action.title);

    return new ThingActionImpl(
      action,
      id,
      thingId,
      owner,
      this._actionRequestFactory,
      this._actionRequestRepository
    );
  }
}
