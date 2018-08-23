import { ContainerModule } from "microinject";

import { ThingPluginManagerImpl } from "./components/impl/ThingPluginManagerImpl";
import { ThingRepositoryImpl } from "./components/impl/ThingRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ThingPluginManagerImpl);
  bind(ThingRepositoryImpl);
});
