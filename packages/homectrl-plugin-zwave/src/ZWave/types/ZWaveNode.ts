import { NodeInfo, Value } from "openzwave-shared";

export interface ZWaveNode extends NodeInfo {
  id: number;
}

export interface ZWaveValue extends Value {}
