import { Identifier } from "homectrl-moziot/node_modules/microinject";

import createSymbol from "../create-symbol";

export namespace SceneParams {
  export const SceneId = "scene.id";
  export const SceneThing = "scene.thing";
}
export const Scene: Identifier<Scene> = createSymbol("Scene");
export interface Scene {
  readonly thingId: string;
}
