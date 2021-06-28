import { ContainerModule } from "microinject";
import { SceneFactory } from "./components";

import { sceneFactoryFactory } from "./impl/SceneFactoryImpl";
import { SceneImpl } from "./impl/SceneImpl";
import { SceneManagerThingImpl } from "./impl/SceneManagerThingImpl";
import { ScenePersistenceManagerImpl } from "./impl/ScenePersistenceManagerImpl";
import { SceneRepositoryImpl } from "./impl/SceneRepositoryImpl";
import { SceneThingsAdapterImpl } from "./impl/SceneThingsAdapterImpl";

export default new ContainerModule((bind) => {
  bind(SceneFactory).toFactory(sceneFactoryFactory).inSingletonScope();
  bind(SceneImpl);
  bind(SceneManagerThingImpl);
  bind(ScenePersistenceManagerImpl);
  bind(SceneRepositoryImpl);
  bind(SceneThingsAdapterImpl);
});
