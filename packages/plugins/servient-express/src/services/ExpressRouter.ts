import { Identifier } from "microinject";
import { Router } from "express";

import createSymbol from "../create-symbol";

export const ExpressRouter: Identifier<ExpressRouter> = createSymbol(
  "ExpressRouter",
);
export type ExpressRouter = Router;
