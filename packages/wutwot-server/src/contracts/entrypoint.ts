import { Identifier } from "microinject";
import { Router } from "express";

import createSymbol from "../create-symbol";

export const Entrypoint: Identifier<Entrypoint> = createSymbol(
  "app-entrypoint",
);
export interface Entrypoint {
  start(): void;
}
