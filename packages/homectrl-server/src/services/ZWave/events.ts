import { ZWaveNode, ZWaveValue } from "./types";

export interface ZWaveEventEmitter {
  on(event: "node.added", handler: (e: ZWaveNodeAddedEvent) => void): this;
  on(event: "node.removed", handler: (e: ZWaveNodeRemovedEvent) => void): this;

  on(event: "value.added", handler: (e: ZWaveValueAddedEvent) => void): this;
  on(
    event: "value.changed",
    handler: (e: ZWaveValueChangedEvent) => void
  ): this;
  on(
    event: "value.removed",
    handler: (e: ZWaveValueRemovedEvent) => void
  ): this;

  removeListener(event: string, handler: Function): this;
}

export interface ZWaveNodeAddedEvent {
  nodeId: number;
  node: ZWaveNode;
}

export interface ZWaveNodeRemovedEvent {
  nodeId: number;
}

export interface ZWaveValueAddedEvent {
  nodeId: number;
  commandClass: number;
  index: number;
  instance: number;
  value: ZWaveValue;
}

export interface ZWaveValueChangedEvent {
  nodeId: number;
  commandClass: number;
  index: number;
  instance: number;
  value: ZWaveValue;
}

export interface ZWaveValueRemovedEvent {
  nodeId: number;
  commandClass: number;
  index: number;
}
