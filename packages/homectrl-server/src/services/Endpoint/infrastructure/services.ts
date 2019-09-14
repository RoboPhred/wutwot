import { Identifier } from "microinject";

import { createSymbol } from "./create-symbol";

export const Controller: Identifier<Controller> = createSymbol("Controller");
export interface Controller {}
