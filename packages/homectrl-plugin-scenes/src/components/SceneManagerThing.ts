import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const SceneManagerThing: Identifier<SceneManagerThing> = createSymbol(
  "SceneManager",
);
export interface SceneManagerThing {}
