import { WutWotPlugin } from "@wutwot/core";
import { ServiceLocator, RegistryModule } from "microinject";

import privateModule from "./module";
import {
  SceneManagerThing,
  SceneFactory,
  ScenePersistenceManager,
} from "./components";
import { SceneRepository } from "./components/SceneRepository";

export class ScenesPlugin implements WutWotPlugin {
  get id(): string {
    return "scenes";
  }

  onRegisterPrivateServices(): RegistryModule {
    return privateModule;
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    const repository = serviceLocator.get(SceneRepository);
    const factory = serviceLocator.get(SceneFactory);
    const persistence = serviceLocator.get(ScenePersistenceManager);

    for (const persistedScene of persistence.getPersistedScenes()) {
      const scene = factory.restoreScene(persistedScene);
      repository.addScene(scene);
    }
  }
}
