import { DataPersistence } from "homectrl-moziot";
import { mapKeys } from "lodash";

import { PersistedScene } from "./types";

export function getAllScenes(
  persistence: DataPersistence,
): Record<string, PersistedScene> {
  const data = persistence.get(["scenes"], {});

  // mapKeys isnt really needed here, as the two are interchangable when in
  //  object keys.
  return mapKeys(data, (key) => Number(key));
}

export function setScene(
  persistence: DataPersistence,
  scene: PersistedScene,
): void {
  const scenes = getAllScenes(persistence);
  scenes[scene.sceneId] = scene;
  persistence.set(["scenes"], scenes);
}
