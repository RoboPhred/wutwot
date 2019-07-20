import { Identifier } from "microinject";
import { createSymbol } from "./create-symbol";

export const RootURL: Identifier<string> = createSymbol("RootURL");
export const Port: Identifier<number> = createSymbol("Port");
