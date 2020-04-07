import { inspect } from "util";

import { makeInspectJson } from "../../../utils/inspect";

import {
  ThingActionRequest,
  ThingActionRequestStatus,
  ThingActionRequestDef,
} from "../types";

/**
 * Provides the implementation of ThingActionRequest for public use.
 */
export class ThingActionRequestImpl implements ThingActionRequest {
  private _lastStatus: ThingActionRequestStatus;
  private _timeCompleted: string | null = null;

  constructor(
    private _id: string,
    private _thingId: string,
    private _actionId: string,
    private _def: ThingActionRequestDef
  ) {
    this._def = { ..._def };

    this._lastStatus = ThingActionRequestStatus.Pending;
    _def.status.subscribe({
      next: (status) => {
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
      },
    });
  }

  [inspect.custom] = makeInspectJson("ThingActionRequest");

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
    return this._def.input;
  }

  get timeRequested(): string {
    return this._def.timeRequested;
  }

  get timeCompleted(): string | null {
    return this._timeCompleted;
  }

  get status(): ThingActionRequestStatus {
    return this._lastStatus;
  }

  toJSON() {
    return {
      id: this.id,
      thingId: this.thingId,
      actionId: this.actionId,
      input: this.input,
      timeRequested: this.timeRequested,
      timeCompleted: this.timeCompleted,
      status: this.status,
    };
  }
}
