import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { ActionEventSink } from "../components";
import {
  ActionEventSource,
  ThingActionAddedEventArgs,
  ThingActionRemovedEventArgs
} from "../services";

import { ThingAction } from "../types";

@injectable()
@singleton()
@provides(ActionEventSource)
@provides(ActionEventSink)
export class ActionEventSourceImpl extends EventEmitter
  implements ActionEventSource, ActionEventSink {
  onActionAdded(thingId: string, actionId: string, action: ThingAction): void {
    const e: ThingActionAddedEventArgs = {
      thingId,
      actionId,
      action
    };
    this.emit("action.added", e);
  }

  onActionRemoved(thingId: string, actionId: string): void {
    const e: ThingActionRemovedEventArgs = {
      thingId,
      actionId
    };
    this.emit("action.removed", e);
  }
}
