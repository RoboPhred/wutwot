import { ContainerModule } from "microinject";
import { SceneFactory } from "./components";

import { sceneFactoryFactory } from "./impl/SceneFactoryImpl";
import { SceneImpl } from "./impl/SceneImpl";
import { SceneManagerImpl } from "./impl/SceneManagerImpl";

export default new ContainerModule((bind) => {
  bind(SceneFactory).toFactory(sceneFactoryFactory).inSingletonScope();
  bind(SceneImpl);
  bind(SceneManagerImpl);
});
