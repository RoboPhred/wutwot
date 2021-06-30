import { Identifier } from "microinject";
import { Router } from "express";

import createSymbol from "../create-symbol";

export const HttpRouter: Identifier<HttpRouter> = createSymbol("HttpRouter");
export type HttpRouter = Router;
