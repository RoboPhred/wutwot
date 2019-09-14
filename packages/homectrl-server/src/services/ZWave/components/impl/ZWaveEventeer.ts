import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { ZWaveNode, ZWaveValue } from "../../types/ZWaveNode";
import {
  ZWaveNodeAddedEvent,
  ZWaveNodeRemovedEvent,
  ZWaveValueAddedEvent,
  ZWaveValueRemovedEvent
} from "../../events";
import { ZWaveEventSource } from "../ZWaveEventSource";
import { ZWaveEventSink } from "../ZWaveEventSink";

@injectable()
@singleton()
@provides(ZWaveEventSource)
@provides(ZWaveEventSink)
export class ZWaveEventeer extends EventEmitter
  implements ZWaveEventSource, ZWaveEventSink {
  constructor() {
    super();
    // Lots of things will listen to this.
    this.setMaxListeners(Number.MAX_VALUE);
  }

  onNodeAdded(node: ZWaveNode): void {
    const e: ZWaveNodeAddedEvent = {
      nodeId: node.id,
      node
    };
    this.emit("node.added", e);
  }

  onNodeRemoved(nodeId: number): void {
    const e: ZWaveNodeRemovedEvent = {
      nodeId
    };
    this.emit("node.removed", e);
  }

  onValueAdded(value: ZWaveValue): void {
    const e: ZWaveValueAddedEvent = {
      nodeId: value.node_id,
      commandClass: value.class_id,
      instance: value.instance,
      index: value.index,
      value
    };
    this.emit("value.added", e);
  }

  onValueChanged(value: ZWaveValue): void {
    const e: ZWaveValueAddedEvent = {
      nodeId: value.node_id,
      commandClass: value.class_id,
      instance: value.instance,
      index: value.index,
      value
    };
    this.emit("value.changed", e);
  }

  onValueRemoved(nodeId: number, commandClass: number, index: number): void {
    const e: ZWaveValueRemovedEvent = {
      nodeId,
      commandClass,
      index
    };
    this.emit("value.removed", e);
  }
}
