import { ThingActionRequestStatus, ThingActionRequestToken } from "../../types";

export class ThingActionRequestTokenImpl implements ThingActionRequestToken {
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
