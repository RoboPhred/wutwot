import { NodeInfo, Value } from "openzwave-shared";

export interface ZWaveNode extends NodeInfo {
  id: number;
  classes: Record<number, Record<number, Record<number, ZWaveValue>>>;
}

export interface ZWaveValue extends Value {}
