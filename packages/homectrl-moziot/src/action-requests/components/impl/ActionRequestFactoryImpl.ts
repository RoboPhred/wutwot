import { injectable, singleton, provides } from "microinject";
import uuidV4 from "uuid/v4";

import {
  ThingActionRequest,
  ThingActionRequestStatus,
  ThingActionRequestToken
} from "../../types";

import { ActionRequestFactory } from "../ActionRequestFactory";

@injectable()
@singleton()
@provides(ActionRequestFactory)
export class ActionRequestFactoryImpl implements ActionRequestFactory {
  createActionRequest(
    thingId: string,
    actionId: string,
    input: object,
    timeRequested: string
  ): { request: ThingActionRequest; token: ThingActionRequestToken } {
    const token = new ThingActionRequestTokenImpl(
      uuidV4(),
      thingId,
      actionId,
      input,
      timeRequested
    );
    const request = new ThingActionRequestImpl(token);

    return { token, request };
  }
}

class ThingActionRequestTokenImpl implements ThingActionRequestToken {
  private _status: ThingActionRequestStatus = ThingActionRequestStatus.Pending;
  private _timeCompleted: string | null = null;

  constructor(
    private _requestId: string,
    private _thingId: string,
    private _actionId: string,
    private _input: any,
    private _timeRequested: string
  ) {}

  get id(): string {
    return this._requestId;
  }

  get thingId(): string {
    return this._thingId;
  }

  get actionId(): string {
    return this._actionId;
  }

  get input(): any {
    return this._input;
  }

  get timeRequested(): string {
    return this._timeRequested;
  }

  get timeCompleted(): string | null {
    return this._timeCompleted;
  }

  get status(): ThingActionRequestStatus {
    return this._status;
  }

  setStatus(status: ThingActionRequestStatus): void {
    if (this._status === status) {
      return;
    }

    if (!ThingActionRequestStatus.canTransition(this._status, status)) {
      throw new Error(
        `Cannot transition from "${this._status}" to "${status}".`
      );
    }

    this._status = status;

    if (ThingActionRequestStatus.isFinalStatus(status)) {
      this._timeCompleted = new Date().toISOString();
    }
  }
}

class ThingActionRequestImpl implements ThingActionRequest {
  constructor(private _token: ThingActionRequestToken) {}

  get id(): string {
    return this._token.id;
  }

  get thingId(): string {
    return this._token.thingId;
  }

  get actionId(): string {
    return this._token.actionId;
  }

  get input(): any {
    return this._token.input;
  }

  get timeRequested(): string {
    return this._token.timeRequested;
  }

  get timeCompleted(): string | null {
    return this._token.timeCompleted;
  }

  get status(): ThingActionRequestStatus {
    return this._token.status;
  }
}
