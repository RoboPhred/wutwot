import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { ActionEventSink } from "../components";
import {
  ActionEventSource,
  ThingActionAddedEventArgs,
  ThingActionRemovedEventArgs,
} from "../services";

import { ThingAction } from "../types";

@injectable()
@singleton()
@provides(ActionEventSource)
@provides(ActionEventSink)
export class ActionEventSourceImpl extends EventEmitter
  implements ActionEventSource, ActionEventSink {
  onActionAdded(action: ThingAction): void {
    const e: ThingActionAddedEventArgs = {
      thingId: action.thingId,
      actionId: action.id,
      action,
    };
    this.emit("action.add", e);
  }

  onActionRemoved(action: ThingAction): void {
    const e: ThingActionRemovedEventArgs = {
      thingId: action.thingId,
      actionId: action.id,
      action,
    };
    this.emit("action.remove", e);
  }
}
