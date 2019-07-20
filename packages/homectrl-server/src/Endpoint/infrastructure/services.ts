import { Identifier } from "microinject";

import { createSymbol } from "../../config/create-symbol";

export const Controller: Identifier<Controller> = createSymbol("Controller");
export interface Controller {}
