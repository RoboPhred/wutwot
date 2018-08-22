import { ContainerModule } from "microinject";

import { ThingPluginManagerImpl } from "./components/impl/ThingPluginManagerImpl";
import { ThingRegistryImpl } from "./components/impl/ThingRegistryImpl";

export default new ContainerModule(bind => {
  bind(ThingPluginManagerImpl);
  bind(ThingRegistryImpl);
});
