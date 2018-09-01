import { injectable, singleton, provides, inject } from "microinject";

import uuidV4 from "uuid/v4";

import { ThingActionDef, ThingAction } from "../../types";

import { ActionRequestFactory } from "../../../action-requests/components/ActionRequestFactory";
import { ActionRequestRepository } from "../../../action-requests/components/ActionRequestRepository";

import { ActionFactory } from "../ActionFactory";

import { ThingActionImpl } from "./ThingActionImpl";

@injectable()
@singleton()
@provides(ActionFactory)
export class ActionFactoryImpl implements ActionFactory {
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
    return new ThingActionImpl(
      action,
      uuidV4(),
      thingId,
      owner,
      this._actionRequestFactory,
      this._actionRequestRepository
    );
  }
}
