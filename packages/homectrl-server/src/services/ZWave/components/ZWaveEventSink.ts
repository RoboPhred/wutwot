import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { ZWaveNode, ZWaveValue } from "../types/ZWaveNode";

export const ZWaveEventSink: Identifier<ZWaveEventSink> = createSymbol(
  "ZWaveEventSink"
);
export interface ZWaveEventSink {
  onNodeAdded(node: ZWaveNode): void;
  onNodeRemoved(nodeId: number): void;

  onValueAdded(value: ZWaveValue): void;
  onValueChanged(value: ZWaveValue): void;
  onValueRemoved(nodeId: number, commandClass: number, index: number): void;
}
