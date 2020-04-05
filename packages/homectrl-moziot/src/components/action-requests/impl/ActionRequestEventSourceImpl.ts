import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { ActionRequestEventSink } from "../components";
import { ThingActionRequest } from "../types";

import {
  ActionRequestEventSource,
  ThingActionRequestAddedEventArgs
} from "../services";

/**
 * Provides the implementation for both ActionRequestEventSource and ActionRequestEventSink.
 *
 * When the sink receives notifications, this implementation will emit the corresponding source event.
 */
@injectable()
@singleton()
@provides(ActionRequestEventSource)
@provides(ActionRequestEventSink)
export class ActionRequestEventSourceImpl extends EventEmitter
  implements ActionRequestEventSource, ActionRequestEventSink {
  onActionRequestAdded(actionRequest: ThingActionRequest): void {
    const e: ThingActionRequestAddedEventArgs = {
      thingId: actionRequest.thingId,
      actionId: actionRequest.actionId,
      actionRequestId: actionRequest.id,
      actionRequest
    };
    this.emit("actionRequest.add", e);
  }
}
