import { inject, injectable, singleton, provides } from "microinject";

import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../components";
import { ThingActionRequest, ThingActionRequestDef } from "../../types";

import { ActionRequestService } from "../ActionRequestService";

@injectable()
@singleton()
@provides(ActionRequestService)
export class ActionRequestServiceImpl implements ActionRequestService {
  constructor(
    @inject(ActionRequestFactory) private _factory: ActionRequestFactory,
    @inject(ActionRequestRepository)
    private _repository: ActionRequestRepository
  ) {}

  addRequest(
    thingId: string,
    actionId: string,
    def: ThingActionRequestDef
  ): ThingActionRequest {
    const request = this._factory.createActionRequest(thingId, actionId, def);

    this._repository.addRequest(request);
    return request;
  }
}
