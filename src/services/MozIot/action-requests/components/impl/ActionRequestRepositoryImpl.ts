import { EventEmitter } from "events";

import { ThingActionRequest } from "../../types";

import { ActionRequestRepository } from "../ActionRequestRepository";

import {
  ThingActionRequestAddedEventArgs,
  ActionRequestRegistry
} from "../ActionRequestRegistry";
import { injectable, singleton, provides } from "microinject";

@injectable()
@singleton()
@provides(ActionRequestRegistry)
@provides(ActionRequestRepository)
export class ActionRequestRepositoryImpl extends EventEmitter
  implements ActionRequestRepository {
  private _requests = new Map<string, ThingActionRequest>();

  get(requestId: string): ThingActionRequest | undefined {
    return this._requests.get(requestId);
  }

  getForThingAction(thingId: string, actionId: string): ThingActionRequest[] {
    const values: ThingActionRequest[] = [];
    for (const request of this._requests.values()) {
      if (request.thingId === thingId && request.actionId === actionId) {
        values.push(request);
      }
    }
    return values;
  }

  addRequest(request: ThingActionRequest): void {
    if (this._requests.has(request.id)) {
      throw new Error("Duplicate request id.");
    }

    this._requests.set(request.id, request);

    const e: ThingActionRequestAddedEventArgs = {
      thingId: request.thingId,
      actionId: request.actionId,
      requestId: request.id,
      request
    };
    this.emit("request.add", e);
  }
}
