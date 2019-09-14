import { inject, injectable, singleton, provides } from "microinject";
import { Observable } from "rxjs";

import {
  ActionRequestFactory,
  ActionRequestRepository
} from "../../components";
import { ThingActionRequestStatus, ThingActionRequest } from "../../types";

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
    input: object,
    timeRequested: string,
    status: Observable<ThingActionRequestStatus>
  ): ThingActionRequest {
    const request = this._factory.createActionRequest(
      thingId,
      actionId,
      input,
      timeRequested,
      status
    );

    this._repository.addRequest(request);
    return request;
  }
}
