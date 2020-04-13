import { Identifier } from "microinject";

import { PersistedScene } from "../types";
import createSymbol from "../create-symbol";

export const ScenePersistenceManager: Identifier<ScenePersistenceManager> = createSymbol(
  "ScenePersistenceManager",
);
export interface ScenePersistenceManager {
  getPersistedScenes(): PersistedScene[];

  setPersistedScene(persistedScene: PersistedScene): void;
}
