import { Observable } from "rxjs";

import { ThingActionRequest, ThingActionRequestStatus } from "../../types";

export class ThingActionRequestImpl implements ThingActionRequest {
  private _lastStatus: ThingActionRequestStatus;
  private _timeCompleted: string | null = null;

  constructor(
    private _id: string,
    private _thingId: string,
    private _actionId: string,
    private _input: any,
    private _timeRequested: string,
    status: Observable<ThingActionRequestStatus>
  ) {
    this._lastStatus = ThingActionRequestStatus.Pending;
    status.subscribe({
      next: status => {
        if (ThingActionRequestStatus.canTransition(this._lastStatus, status)) {
          this._lastStatus = status;
        }
        if (this._lastStatus === ThingActionRequestStatus.Completed) {
          this._timeCompleted = new Date().toISOString();
        }
      },
      complete: () => {
        if (!ThingActionRequestStatus.isFinalStatus(this._lastStatus)) {
          this._lastStatus = ThingActionRequestStatus.Completed;
          this._timeCompleted = new Date().toISOString();
        }
      },
      error: () => {
        if (!ThingActionRequestStatus.isFinalStatus(this._lastStatus)) {
          this._lastStatus = ThingActionRequestStatus.Error;
        }
      }
    });
  }

  get id(): string {
    return this._id;
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
    return this._lastStatus;
  }
}
