import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const SceneManager: Identifier<SceneManager> = createSymbol(
  "SceneManager",
);
export interface SceneManager {}
