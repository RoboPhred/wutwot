import { inject, injectable, singleton, provides } from "microinject";

import { ThingActionRequestToken } from "../../types";

import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../components";

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
    input: any,
    timeRequested: string
  ): ThingActionRequestToken {
    const { request, token } = this._factory.createActionRequest(
      thingId,
      actionId,
      input,
      timeRequested
    );

    this._repository.addRequest(request);
    return token;
  }
}
