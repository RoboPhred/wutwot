import { Identifier } from "microinject";
import createSymbol from "../create-symbol";

export const ZWaveThingAdapter: Identifier<ZWaveThingAdapter> = createSymbol(
  "ZWaveThingAdapter"
);
export interface ZWaveThingAdapter {}
