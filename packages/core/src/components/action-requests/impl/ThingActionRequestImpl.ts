import { inspect } from "util";
import { Observable } from "rxjs";

import { makeInspectJson } from "../../../utils/inspect";

import {
  ThingActionRequest,
  ThingActionRequestStatus,
  ThingActionRequestDef,
  ThingActionRequestUpdate,
} from "../types";
import { createDeferred, Deferred } from "../../../utils/deferred-promise";

/**
 * Provides the implementation of ThingActionRequest for public use.
 */
export class ThingActionRequestImpl implements ThingActionRequest {
  private _status: ThingActionRequestStatus;
  private _timeCompleted: string | null = null;
  private _timeRequested: string;
  private _input: any = undefined;
  private _output: any = undefined;
  private _promiseDefer: Deferred<any>;

  constructor(
    private _id: string,
    private _thingId: string,
    private _actionId: string,
    def: ThingActionRequestDef,
  ) {
    this._promiseDefer = createDeferred();
    this._timeRequested = def.timeRequested;
    this._input = def.input;
    this._status = def.initialStatus;

    switch (def.initialStatus) {
      case ThingActionRequestStatus.Started:
      case ThingActionRequestStatus.Pending:
        this._subscribe(def.status);
        break;
      case ThingActionRequestStatus.Completed:
        this._output = def.output;
        this._promiseDefer.resolve(def.output);
        this._timeCompleted = def.timeCompleted;
        break;
      case ThingActionRequestStatus.Error:
        this._timeCompleted = def.timeCompleted;
        // TODO: Spec doesn't seem to take into account error messages.
        this._promiseDefer.reject(new Error("The action invocation failed."));
        break;
    }
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
    return this._input;
  }

  get output(): any {
    return this._output;
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

  toPromise() {
    return this._promiseDefer.promise;
  }

  toJSON() {
    return {
      id: this.id,
      thingId: this.thingId,
      actionId: this.actionId,
      input: this.input,
      output: this._output,
      timeRequested: this.timeRequested,
      timeCompleted: this.timeCompleted,
      status: this.status,
    };
  }

  private _subscribe(status: Observable<ThingActionRequestUpdate>) {
    status.subscribe({
      next: (update) => {
        if (
          !ThingActionRequestStatus.canTransition(this._status, update.status)
        ) {
          throw new Error(
            `Illegal state change: Action request cannot transition from ${this._status} to ${update.status}`,
          );
        }
        this._status = update.status;
        if (ThingActionRequestStatus.isFinalStatus(update.status)) {
          this._timeCompleted = new Date().toISOString();
        }
        if (update.status === ThingActionRequestStatus.Completed) {
          this._output = update.output;
          this._promiseDefer.resolve(update.output);
        } else if (update.status === ThingActionRequestStatus.Error) {
          // TODO: Spec doesn't seem to take into account error messages.
          this._promiseDefer.reject(new Error("The action invocation failed."));
        }
      },
      complete: () => {
        if (!ThingActionRequestStatus.isFinalStatus(this._status)) {
          this._status = ThingActionRequestStatus.Completed;
          this._timeCompleted = new Date().toISOString();
          // TODO: No output?
          this._promiseDefer.resolve(undefined);
        }
      },
      error: () => {
        if (!ThingActionRequestStatus.isFinalStatus(this._status)) {
          this._status = ThingActionRequestStatus.Error;
          this._promiseDefer.reject(new Error("The action invocation failed."));
        }
      },
    });
  }
}
