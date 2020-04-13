import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { Scene } from "./Scene";

export const SceneRegistry: Identifier<SceneRegistry> = createSymbol(
  "SceneRegistry",
);
export interface SceneRegistry {
  [Symbol.iterator](): IterableIterator<Scene>;
}
