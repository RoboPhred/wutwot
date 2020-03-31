import { ZWaveNode } from "zwave-js";
import { ZThingAdapter } from "./ZThingAdapter";
import { Identifier } from "microinject";
import createSymbol from "../create-symbol";

export const ZThingAdapterFactory: Identifier<ZThingAdapterFactory> = createSymbol(
  "ZThingAdapterFactory"
);
export interface ZThingAdapterFactory {
  createAdapter(node: ZWaveNode): ZThingAdapter;
}
