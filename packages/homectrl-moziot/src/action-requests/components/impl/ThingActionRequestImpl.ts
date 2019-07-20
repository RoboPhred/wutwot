import {
  ThingActionRequest,
  ThingActionRequestToken,
  ThingActionRequestStatus
} from "../../types";

export class ThingActionRequestImpl implements ThingActionRequest {
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
